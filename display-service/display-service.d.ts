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
    echo(message: string): void;
    color(message: string, color: string): void;
    table(title: string, groups: TableGroupDefinition[]): void;
    colorify(text: string): string;
    commandify(text: string, commands: string, hint: string): string;
    clickify(text: string, code: string, hint: string): string;
    getLength(text: string): number;
}

export type DisplayServiceClient = typeof client & {
    displayservice: DisplayService;
};
