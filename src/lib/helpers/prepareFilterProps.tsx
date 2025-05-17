export default function prepareFilterProps(configKeys, globalState) {
    return configKeys.reduce((props, key) => {
        if (key in globalState) {
            props[key] = globalState[key];
        }
        return props;
    }, {});
}
