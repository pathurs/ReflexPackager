interface TableGroupItemDefinition {
    label: string;
    value: string;
}

interface TableGroupDefinition {
    title: string | undefined;
    columns: 1 | 2 | 3 | 4;
    items: TableGroupItemDefinition[];
}

interface DisplayService {
    table(title: string, groups: TableGroupDefinition[]): void;
    clickify(text: string, commands: string, hint: string, fgcolor?: string, bgcolor?: string): string;
}

export type DisplayServiceClient = typeof client & {
    displayservice: DisplayService;
};
