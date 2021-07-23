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
    echo(messages: string[]): void;
    box(message: string, borderCharacter?: string): void;
    table(title: string, groups: TableGroupDefinition[]): void;
    color(text: string, color: string): void;
    colorify(text: string): string;
    rainbowify(text: string): string;
    commandify(text: string, commands: string, hint: string): string;
    clickify(text: string, code: string, hint: string): string;
}

export type DisplayServiceClient = typeof client & {
    displayService: DisplayService;
};
