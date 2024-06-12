declare global {
    /**
     * ⚠️ FSD
     *
     * Its hack way to export redux infering types from @/app
     * and use it in @/shared/model/hooks.ts
     */

    declare type RootState = import('../store/appStore').RootState;
    declare type AppDispatch = import('../store/appStore').AppDispatch;
    declare type ThunkApiConfig = import('../store/appStore').ThunkApiConfig;
    declare type StoreExtraOptions =
        import('../store/appStore').StoreExtraOptions;
}

export {};
