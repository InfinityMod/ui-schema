import React from 'react'
import { Translator } from '@ui-schema/ui-schema/Translate/makeTranslator'
import { WidgetProps } from '@ui-schema/ui-schema/Widget'
import { getDisplayName } from '@ui-schema/ui-schema/Utils/memo'
import { WidgetsBindingFactory } from '@ui-schema/ui-schema/WidgetsBinding'

// @ts-ignore
const UIMetaContextObj = React.createContext<UIMetaContext>({})

export interface UIMetaContext<W = WidgetsBindingFactory> {
    widgets: W
    t: Translator
}

export function UIMetaProvider<C extends {} = {}, W extends WidgetsBindingFactory = WidgetsBindingFactory>(
    {children, ...props}: React.PropsWithChildren<UIMetaContext<W> & C>,
): React.ReactElement {
    const ctx = React.useMemo(() => ({...props}), [...Object.values(props)])
    return <UIMetaContextObj.Provider value={ctx}>
        {children}
    </UIMetaContextObj.Provider>
}

export const useUIMeta = <C extends {} = {}, W extends WidgetsBindingFactory = WidgetsBindingFactory>(): UIMetaContext<W> & C => {
    // @ts-ignore
    return React.useContext<UIMetaContext<W & C>>(UIMetaContextObj)
}

export const withUIMeta = <P extends WidgetProps, C extends {} = {}, W extends WidgetsBindingFactory = WidgetsBindingFactory>(
    Component: React.ComponentType<P & UIMetaContext<W> & C>
): React.ComponentType<P> => {
    const WithUIMeta = (p: P) => {
        const meta = useUIMeta<C, W>()
        return <Component {...meta} {...p}/>
    }
    WithUIMeta.displayName = `WithUIMeta(${getDisplayName(Component)})`
    return WithUIMeta
}
