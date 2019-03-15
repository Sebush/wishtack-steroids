import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { Schema as NgComponentOptions } from '@schematics/angular/component/schema';

export interface ScamOptions extends NgComponentOptions {
    separateModule: boolean;
}

export const _mergeModuleIntoComponentFile: Rule = (tree, context) => {
    return tree;
};

export function scam(options: ScamOptions): Rule {

    let ruleList = [
        externalSchematic('@schematics/angular', 'module', options),
        externalSchematic('@schematics/angular', 'component', {
            ...options,
            export: true,
            module: options.name
        })
    ];

    if (!options.separateModule) {
        ruleList = [
            ...ruleList,
            _mergeModuleIntoComponentFile
        ];
    }

    return chain(ruleList);

}
