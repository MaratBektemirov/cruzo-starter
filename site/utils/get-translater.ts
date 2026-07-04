import { AbstractComponent } from 'cruzo'
import { langService } from '../services/lang.service'
import { Lang } from '../translate'

type I18N = Record<Lang, object>

/**
 * 
 * @param i18n - json словарь с переводами
 * @param c - класс компонента
 * @returns t$ - перменная содержащая данные из словаря
*/
export const getTranslater = (i18n: I18N, c: AbstractComponent) => {
	const lang$ = c.newRxFunc(() => langService.lang$.actual, langService.lang$);
  const t$ = c.newRxFunc((lang) => i18n[lang], lang$);

	return t$
}