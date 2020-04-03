import * as fs from 'fs';
import { ReflexPackagerConfig } from './config';
import { Items } from './items';
import { PackageItem } from './package';

export function createFromFile(items: Items, configPath: string = 'rpconfig.json') {
    return create(items, JSON.parse(fs.readFileSync(configPath).toString()));
}

export function create(items: Items, config: ReflexPackagerConfig) {
    const foo = new PackageItem(
        config.name,
        config.description,
        items
    );

    fs.writeFileSync(config.outFile, JSON.stringify(foo, undefined, 4));
}
