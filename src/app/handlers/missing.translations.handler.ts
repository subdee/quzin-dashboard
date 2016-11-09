import {MissingTranslationHandler} from 'ng2-translate';

export class QuzinMissingTranslationHandler implements MissingTranslationHandler {
  handle(key: string) {
    console.log('Missing translation for: ' + key);
  }
}
