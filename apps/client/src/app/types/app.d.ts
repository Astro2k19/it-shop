declare global {
    /**
     * ⚠️ FSD
     *
     * Its hack way to export redux infering types from @/app
     * and use it in @/shared/model/hooks.ts
     */

    declare type RootState = import('../providers/store/appStore').RootState;
    declare type AppDispatch =
        import('../providers/store/appStore').AppDispatch;
}
