import { App, Notice, PluginSettingTab, debounce } from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom';
import which from 'which';

import ZoteroConnector from '../main';
import {
  CitationFormat,
  ExportFormat,
  ZoteroConnectorSettings,
} from '../types';
import { AssetDownloader } from './AssetDownloader';
import { CiteFormatSettings } from './CiteFormatSettings';
import { ExportFormatSettings } from './ExportFormatSettings';
import { Icon } from './Icon';
import { SettingItem } from './SettingItem';
import { L, t } from '../i18n';

interface SettingsComponentProps {
  settings: ZoteroConnectorSettings;
  addCiteFormat: (format: CitationFormat) => CitationFormat[];
  updateCiteFormat: (index: number, format: CitationFormat) => CitationFormat[];
  removeCiteFormat: (index: number) => CitationFormat[];
  addExportFormat: (format: ExportFormat) => ExportFormat[];
  updateExportFormat: (index: number, format: ExportFormat) => ExportFormat[];
  removeExportFormat: (index: number) => ExportFormat[];
  updateSetting: (key: keyof ZoteroConnectorSettings, value: any) => void;
}

function SettingsComponent({
  settings,
  addCiteFormat,
  updateCiteFormat,
  removeCiteFormat,
  addExportFormat,
  updateExportFormat,
  removeExportFormat,
  updateSetting,
}: SettingsComponentProps) {
  const [citeFormatState, setCiteFormatState] = React.useState(
    settings.citeFormats
  );
  const [exportFormatState, setExportFormatState] = React.useState(
    settings.exportFormats
  );

  const [openNoteAfterImportState, setOpenNoteAfterImport] = React.useState(
    !!settings.openNoteAfterImport
  );

  const [ocrState, setOCRState] = React.useState(settings.pdfExportImageOCR);

  const [concat, setConcat] = React.useState(!!settings.shouldConcat);

  const [pdfUtility, setPDFUtility] = React.useState(
    !!settings.enablePDFUtility
  );

  const updateCite = React.useCallback(
    debounce(
      (index: number, format: CitationFormat) => {
        setCiteFormatState(updateCiteFormat(index, format));
      },
      200,
      true
    ),
    [updateCiteFormat]
  );

  const addCite = React.useCallback(() => {
    setCiteFormatState(
      addCiteFormat({
        name: `Format #${citeFormatState.length + 1}`,
        format: 'formatted-citation',
      })
    );
  }, [addCiteFormat, citeFormatState]);

  const removeCite = React.useCallback(
    (index: number) => {
      setCiteFormatState(removeCiteFormat(index));
    },
    [removeCiteFormat]
  );

  const updateExport = React.useCallback(
    debounce(
      (index: number, format: ExportFormat) => {
        setExportFormatState(updateExportFormat(index, format));
      },
      200,
      true
    ),
    [updateExportFormat]
  );

  const addExport = React.useCallback(() => {
    setExportFormatState(
      addExportFormat({
        name: `Import #${exportFormatState.length + 1}`,
        outputPathTemplate: '{{citekey}}.md',
        imageOutputPathTemplate: '{{citekey}}/',
        imageBaseNameTemplate: 'image',
      })
    );
  }, [addExportFormat, citeFormatState]);

  const removeExport = React.useCallback(
    (index: number) => {
      setExportFormatState(removeExportFormat(index));
    },
    [removeExportFormat]
  );

  const tessPathRef = React.useRef<HTMLInputElement>(null);
  const tessDataPathRef = React.useRef<HTMLInputElement>(null);

  const [useCustomPort, setUseCustomPort] = React.useState(
    settings.database === 'Custom'
  );

  return (
    <div>
      <SettingItem name={t("General Settings")} isHeading />
      <SettingItem
        name={t("PDF utility (pdfannots2json)")}
        description={t("Optional. Only needed for annotations stored inside PDF files by other apps. Annotations made in the Zotero reader are imported without it.")}
      >
        <div
          onClick={() => {
            setPDFUtility((state) => {
              updateSetting('enablePDFUtility', !state);
              return !state;
            });
          }}
          className={`checkbox-container${pdfUtility ? ' is-enabled' : ''}`}
        />
      </SettingItem>
      {pdfUtility && (
        <AssetDownloader settings={settings} updateSetting={updateSetting} />
      )}
      <SettingItem
        name={t("Database")}
        description={t("Supports Zotero and Juris-M. Alternatively a custom port number can be specified.")}
      >
        <select
          className="dropdown"
          defaultValue={settings.database}
          onChange={(e) => {
            const value = (e.target as HTMLSelectElement).value;
            updateSetting('database', value);
            if (value === 'Custom') {
              setUseCustomPort(true);
            } else {
              setUseCustomPort(false);
            }
          }}
        >
          <option value="Zotero">Zotero</option>
          <option value="Juris-M">Juris-M</option>
          <option value="Custom">{t("Custom")}</option>
        </select>
      </SettingItem>
      {useCustomPort ? (
        <SettingItem
          name={t("Port number")}
          description={t("If a custom port number has been set in Zotero, enter it here.")}
        >
          <input
            onChange={(e) =>
              updateSetting('port', (e.target as HTMLInputElement).value)
            }
            type="number"
            placeholder={t("Example: 23119")}
            defaultValue={settings.port}
          />
        </SettingItem>
      ) : null}
      <SettingItem
        name={t("Note Import Location")}
        description={t("Notes imported from Zotero will be added to this folder in your vault")}
      >
        <input
          onChange={(e) =>
            updateSetting(
              'noteImportFolder',
              (e.target as HTMLInputElement).value
            )
          }
          type="text"
          spellCheck={false}
          placeholder={t("Example: folder 1/folder 2")}
          defaultValue={settings.noteImportFolder}
        />
      </SettingItem>
      <SettingItem
        name={t("Open the created or updated note(s) after import")}
        description={t("The created or updated markdown files resulting from the import will be automatically opened.")}
      >
        <div
          onClick={() => {
            setOpenNoteAfterImport((state) => {
              updateSetting('openNoteAfterImport', !state);
              return !state;
            });
          }}
          className={`checkbox-container${
            openNoteAfterImportState ? ' is-enabled' : ''
          }`}
        />
      </SettingItem>
      <SettingItem
        name={t("Which notes to open after import")}
        description={t("Open either the first note imported, the last note imported, or all notes in new tabs.")}
      >
        <select
          className="dropdown"
          defaultValue={settings.whichNotesToOpenAfterImport}
          disabled={!settings.openNoteAfterImport}
          onChange={(e) =>
            updateSetting(
              'whichNotesToOpenAfterImport',
              (e.target as HTMLSelectElement).value
            )
          }
        >
          <option value="first-imported-note">{t("First imported note")}</option>
          <option value="last-imported-note">{t("Last imported note")}</option>
          <option value="all-imported-notes">{t("All imported notes")}</option>
        </select>
      </SettingItem>
      <SettingItem
        name={t("Enable Annotation Concatenation")}
        description={t("Annotations extracted from PDFs that begin with '+' will be appended to the previous annotation. Note: Annotation ordering is not always consistent and you may not always acheive the desire concatenation result")}
      >
        <div
          onClick={() => {
            setConcat((state) => {
              updateSetting('shouldConcat', !state);
              return !state;
            });
          }}
          className={`checkbox-container${concat ? ' is-enabled' : ''}`}
        />
      </SettingItem>
      <SettingItem name={t("Citation Formats")} isHeading />
      <SettingItem>
        <button onClick={addCite} className="mod-cta">
          {t("Add Citation Format")}
        </button>
      </SettingItem>
      {citeFormatState.map((f, i) => {
        return (
          <CiteFormatSettings
            key={i}
            format={f}
            index={i}
            updateFormat={updateCite}
            removeFormat={removeCite}
          />
        );
      })}

      <SettingItem name={t("Import Formats")} isHeading />
      <SettingItem>
        <button onClick={addExport} className="mod-cta">
          {t("Add Import Format")}
        </button>
      </SettingItem>
      {exportFormatState.map((f, i) => {
        return (
          <ExportFormatSettings
            key={exportFormatState.length - i}
            format={f}
            index={i}
            updateFormat={updateExport}
            removeFormat={removeExport}
          />
        );
      })}

      <SettingItem
        name={t("Import Image Settings")}
        description={t("Rectangle annotations will be extracted from PDFs as images.")}
        isHeading
      />
      <SettingItem name={t("Image Format")}>
        <select
          className="dropdown"
          defaultValue={settings.pdfExportImageFormat}
          onChange={(e) =>
            updateSetting(
              'pdfExportImageFormat',
              (e.target as HTMLSelectElement).value
            )
          }
        >
          <option value="jpg">jpg</option>
          <option value="png">png</option>
        </select>
      </SettingItem>
      <SettingItem name={t("Image Quality (jpg only)")}>
        <input
          min="0"
          max="100"
          onChange={(e) =>
            updateSetting(
              'pdfExportImageQuality',
              Number((e.target as HTMLInputElement).value)
            )
          }
          type="number"
          defaultValue={settings.pdfExportImageQuality.toString()}
        />
      </SettingItem>
      <SettingItem name={t("Image DPI")}>
        <input
          min="0"
          onChange={(e) =>
            updateSetting(
              'pdfExportImageDPI',
              Number((e.target as HTMLInputElement).value)
            )
          }
          type="number"
          defaultValue={settings.pdfExportImageDPI.toString()}
        />
      </SettingItem>
      <SettingItem
        name={t("Image OCR")}
        description={L(
<div>
            Attempt to extract text from images created by rectangle
            annotations. This requires that{' '}
            <a
              href="https://tesseract-ocr.github.io/tessdoc/"
              target="_blank"
              rel="noreferrer"
            >
              tesseract
            </a>{' '}
            be installed on your system. Tesseract can be installed from
            <a href="https://brew.sh/" target="_blank" rel="noreferrer">
              homebrew on mac
            </a>
            , various linux package managers, and from{' '}
            <a
              href="https://github.com/UB-Mannheim/tesseract/wiki"
              target="_blank"
              rel="noreferrer"
            >
              here on windows
            </a>
            .
          </div>,
<div>Пытаться распознать текст на изображениях из прямоугольных аннотаций. Для этого в системе должен быть установлен{' '}<a href="https://tesseract-ocr.github.io/tessdoc/" target="_blank" rel="noreferrer">Tesseract</a>. Установить его можно через{' '}<a href="https://brew.sh/" target="_blank" rel="noreferrer">Homebrew на Mac</a>, менеджеры пакетов Linux и{' '}<a href="https://github.com/UB-Mannheim/tesseract/wiki" target="_blank" rel="noreferrer">отсюда для Windows</a>.</div>
)}
      >
        <div
          onClick={() =>
            setOCRState((s) => {
              updateSetting('pdfExportImageOCR', !s);
              return !s;
            })
          }
          className={`checkbox-container${ocrState ? ' is-enabled' : ''}`}
        />
      </SettingItem>
      <SettingItem
        name={t("Tesseract path")}
        description={L(
<div>
            Required: An absolute path to the tesseract executable. This can be
            found on mac and linux with the terminal command{' '}
            <pre>which tesseract</pre>
          </div>,
<div>Обязательно: абсолютный путь к исполняемому файлу Tesseract. На Mac и Linux его покажет команда в терминале{' '}<pre>which tesseract</pre></div>
)}
      >
        <input
          ref={tessPathRef}
          onChange={(e) =>
            updateSetting(
              'pdfExportImageTesseractPath',
              (e.target as HTMLInputElement).value
            )
          }
          type="text"
          defaultValue={settings.pdfExportImageTesseractPath}
        />
        <div
          className="clickable-icon setting-editor-extra-setting-button"
          aria-label={t("Attempt to find tesseract automatically")}
          onClick={async () => {
            try {
              const pathToTesseract = await which('tesseract');
              if (pathToTesseract) {
                tessPathRef.current.value = pathToTesseract;
                updateSetting('pdfExportImageTesseractPath', pathToTesseract);
              } else {
                new Notice(
                  t("Unable to find tesseract on your system. If it is installed, please manually enter a path.")
                );
              }
            } catch (e) {
              new Notice(
                t("Unable to find tesseract on your system. If it is installed, please manually enter a path.")
              );
              console.error(e);
            }
          }}
        >
          <Icon name="magnifying-glass" />
        </div>
      </SettingItem>
      <SettingItem
        name={t("Image OCR Language")}
        description={L(
<div>
            Optional: defaults to english. Multiple languages can be specified
            like so: <pre>eng+deu</pre>. Each language must be installed on your
            system.{' '}
            <a
              href="https://github.com/tesseract-ocr/tessdata"
              target="_blank"
              rel="noreferrer"
            >
              Languages can be downloaded here
            </a>
            . (See{' '}
            <a
              href="https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html"
              target="_blank"
              rel="noreferrer"
            >
              here for a description of the language codes
            </a>
            )
          </div>,
<div>Необязательно: по умолчанию — английский. Несколько языков указываются так: <pre>eng+rus</pre>. Каждый язык должен быть установлен в системе.{' '}<a href="https://github.com/tesseract-ocr/tessdata" target="_blank" rel="noreferrer">Языковые файлы можно скачать здесь</a>. (Коды языков —{' '}<a href="https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html" target="_blank" rel="noreferrer">здесь</a>.)</div>
)}
      >
        <input
          onChange={(e) =>
            updateSetting(
              'pdfExportImageOCRLang',
              (e.target as HTMLInputElement).value
            )
          }
          type="text"
          defaultValue={settings.pdfExportImageOCRLang}
        />
      </SettingItem>
      <SettingItem
        name={t("Tesseract data directory")}
        description={t("Optional: supply an absolute path to the directory where tesseract's language files reside. This folder should include *.traineddata files for your selected languages.")}
      >
        <input
          ref={tessDataPathRef}
          onChange={(e) =>
            updateSetting(
              'pdfExportImageTessDataDir',
              (e.target as HTMLInputElement).value
            )
          }
          type="text"
          defaultValue={settings.pdfExportImageTessDataDir}
        />
        <div
          className="clickable-icon setting-editor-extra-setting-button"
          aria-label={t("Select the tesseract data directory")}
          onClick={() => {
            const path = require('electron').remote.dialog.showOpenDialogSync({
              properties: ['openDirectory'],
            });

            if (path && path.length) {
              tessDataPathRef.current.value = path[0];
              updateSetting('pdfExportImageTessDataDir', path[0]);
            }
          }}
        >
          <Icon name="lucide-folder-open" />
        </div>
      </SettingItem>
    </div>
  );
}

export class ZoteroConnectorSettingsTab extends PluginSettingTab {
  plugin: ZoteroConnector;
  dbTimer: number;

  constructor(app: App, plugin: ZoteroConnector) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    ReactDOM.render(
      <SettingsComponent
        settings={this.plugin.settings}
        addCiteFormat={this.addCiteFormat}
        updateCiteFormat={this.updateCiteFormat}
        removeCiteFormat={this.removeCiteFormat}
        addExportFormat={this.addExportFormat}
        updateExportFormat={this.updateExportFormat}
        removeExportFormat={this.removeExportFormat}
        updateSetting={this.updateSetting}
      />,
      this.containerEl
    );
  }

  addCiteFormat = (format: CitationFormat) => {
    this.plugin.addFormatCommand(format);
    this.plugin.settings.citeFormats.unshift(format);
    this.debouncedSave();

    return this.plugin.settings.citeFormats.slice();
  };

  updateCiteFormat = (index: number, format: CitationFormat) => {
    this.plugin.removeFormatCommand(this.plugin.settings.citeFormats[index]);
    this.plugin.addFormatCommand(format);
    this.plugin.settings.citeFormats[index] = format;
    this.debouncedSave();

    return this.plugin.settings.citeFormats.slice();
  };

  removeCiteFormat = (index: number) => {
    this.plugin.removeFormatCommand(this.plugin.settings.citeFormats[index]);
    this.plugin.settings.citeFormats.splice(index, 1);
    this.debouncedSave();

    return this.plugin.settings.citeFormats.slice();
  };

  addExportFormat = (format: ExportFormat) => {
    this.plugin.addExportCommand(format);
    this.plugin.settings.exportFormats.unshift(format);
    this.debouncedSave();

    return this.plugin.settings.exportFormats.slice();
  };

  updateExportFormat = (index: number, format: ExportFormat) => {
    this.plugin.removeExportCommand(this.plugin.settings.exportFormats[index]);
    this.plugin.addExportCommand(format);
    this.plugin.settings.exportFormats[index] = format;
    this.debouncedSave();

    return this.plugin.settings.exportFormats.slice();
  };

  removeExportFormat = (index: number) => {
    this.plugin.removeExportCommand(this.plugin.settings.exportFormats[index]);
    this.plugin.settings.exportFormats.splice(index, 1);
    this.debouncedSave();

    return this.plugin.settings.exportFormats.slice();
  };

  updateSetting = <T extends keyof ZoteroConnectorSettings>(
    key: T,
    value: ZoteroConnectorSettings[T]
  ) => {
    this.plugin.settings[key] = value;
    this.debouncedSave();
  };

  debouncedSave() {
    clearTimeout(this.dbTimer);
    this.dbTimer = activeWindow.setTimeout(() => {
      this.plugin.saveSettings();
    }, 150);
  }

  hide() {
    super.hide();
    ReactDOM.unmountComponentAtNode(this.containerEl);
  }
}
