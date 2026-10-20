import download from 'download';
import { Notice, debounce } from 'obsidian';
import os from 'os';
import React from 'react';
import {
  checkEXEVersion,
  doesEXEExist,
  doesLegacyEXEExist,
  doesLegacyEXEExist2,
  getExeRoot,
  removeEXE,
  removeLegacyEXE,
  removeLegacyEXE2,
  scopeExe,
} from 'src/helpers';
import { ZoteroConnectorSettings } from 'src/types';

import { Icon } from './Icon';
import { SettingItem } from './SettingItem';
import { L, t } from '../i18n';

export const currentVersion = '1.0.15';
export const internalVersion = 1;

const options: Record<string, Record<string, string>> = {
  darwin: {
    x64: `https://github.com/mgmeyers/pdfannots2json/releases/download/${currentVersion}/pdfannots2json.Mac.Intel.tar.gz`,
    arm64: `https://github.com/mgmeyers/pdfannots2json/releases/download/${currentVersion}/pdfannots2json.Mac.M1.tar.gz`,
  },
  linux: {
    x64: `https://github.com/mgmeyers/pdfannots2json/releases/download/${currentVersion}/pdfannots2json.Linux.x64.tar.gz`,
  },
  win32: {
    x64: `https://github.com/mgmeyers/pdfannots2json/releases/download/${currentVersion}/pdfannots2json.Windows.x64.zip`,
  },
};

function getDownloadUrl() {
  const platform = options[os.platform()];

  if (!platform) return null;

  const url = platform[os.arch()];

  if (!url) return null;

  return url;
}

export async function downloadAndExtract() {
  const url = getDownloadUrl();

  console.log('Obsidian Zotero Integration: Downloading ' + url);

  if (!url) return false;

  try {
    if (doesLegacyEXEExist2()) {
      removeLegacyEXE2();
    }

    if (doesLegacyEXEExist()) {
      removeLegacyEXE();
    }

    if (doesEXEExist()) {
      removeEXE();
    }

    await download(url, getExeRoot(), {
      extract: true,
    });

    scopeExe();
  } catch (e) {
    console.error(e);
    new Notice(
      t("Error downloading PDF utility. Check the console for more details."),
      10000
    );
  }

  return true;
}

export function AssetDownloader(props: {
  settings: ZoteroConnectorSettings;
  updateSetting: (key: keyof ZoteroConnectorSettings, value: any) => void;
}) {
  const [isUpToDate, setIsUpToDate] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [exists, setExists] = React.useState(false);
  const [overridePath, setOverridePath] = React.useState(
    props.settings.exeOverridePath
  );

  const setOverride = React.useMemo(
    () =>
      debounce(
        (path: string) => {
          setOverridePath(path);
          props.updateSetting('exeOverridePath', path);
        },
        150,
        true
      ),
    []
  );

  React.useEffect(() => {
    const exists = doesEXEExist(overridePath);
    setExists(exists);

    if (exists) {
      checkEXEVersion(overridePath)
        .then((version) => {
          setIsUpToDate(`v${currentVersion}` === version);
        })
        .catch(() => {});
    }
  }, [overridePath]);

  const handleDownload = React.useCallback(() => {
    setIsLoading(true);

    downloadAndExtract().then((success) => {
      setIsLoading(false);

      if (success) {
        setIsUpToDate(true);
        setExists(true);
      }
    });
  }, []);

  const desc = [
    t('Annotations stored inside PDF files by other apps are extracted with an external tool.'),
    t('Annotations made in the Zotero reader are imported without it.'),
  ];

  const overrideDesc = L(
    <>
      Override the path to the PDF utility. Specify an absolute path to the
      pdfannots2json executable.{' '}
      <a
        href="https://github.com/mgmeyers/pdfannots2json/releases"
        target="_blank"
        rel="noreferrer"
      >
        Download the executable here.
      </a>{' '}
      You may need to provide Obsidian the appropriate OS permissions to access
      the executable.
    </>,
    <>Свой путь к утилите для PDF: абсолютный путь к исполняемому файлу pdfannots2json.{' '}<a href="https://github.com/mgmeyers/pdfannots2json/releases" target="_blank" rel="noreferrer">Скачать его можно здесь.</a>{' '}Возможно, Obsidian понадобится разрешение системы на доступ к этому файлу.</>
  );

  const Override = (
    <SettingItem name={t("PDF Utility Path Override")} description={overrideDesc}>
      <input
        onChange={(e) => setOverride((e.target as HTMLInputElement).value)}
        type="text"
        spellCheck={false}
        value={overridePath}
      />
      <div
        className="clickable-icon setting-editor-extra-setting-button"
        aria-label={t("Select the pdfannots2json executable")}
        onClick={() => {
          const path = require('electron').remote.dialog.showOpenDialogSync({
            properties: ['openFile'],
          });

          if (path && path.length) {
            setOverride(path[0]);
          }
        }}
      >
        <Icon name="lucide-folder-open" />
      </div>
    </SettingItem>
  );

  if (exists && isUpToDate) {
    return (
      <>
        <SettingItem name={t("PDF Utility")} description={desc.join(' ')}>
          <div className="zt-asset-success">
            <div className="zt-asset-success__icon">
              <Icon name="check-small" />
            </div>
            <div className="zt-asset-success__message">
              {t("PDF utility is up to date.")}
            </div>
          </div>
        </SettingItem>
        {Override}
      </>
    );
  }

  const descFrag = (
    <>
      {desc.join(' ')}{' '}
      {exists && (
        <strong className="mod-warning">
          {t("The PDF extraction tool requires updating. Please re-download.")}
        </strong>
      )}
      {!exists && !overridePath && (
        <strong>{t("Click the button to download.")}</strong>
      )}
    </>
  );

  return (
    <>
      <SettingItem name={t("PDF Utility")} description={descFrag}>
        {!overridePath && (
          <button disabled={isLoading} onClick={handleDownload}>
            {isLoading ? t('Downloading...') : t('Download')}
          </button>
        )}
      </SettingItem>
      {Override}
    </>
  );
}
