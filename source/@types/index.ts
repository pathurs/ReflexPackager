export { };

declare global {
    // Commands

    /**
     * Send a command to the game. Set no_expansion to 1 to send the exact string to the game without expansion.
     */
    function send_command(input: string, no_expansion?: 1 | 0): void;
    /**
     * Display a notice on the output screen.
     */
    function display_notice(text: string, fgcolor?: string, bgcolor?: string): void;

    // Variables

    /**
     * Retrieve the value of a variable from the client's simplified scripting system.
     */
    function get_variable(name: string): unknown;
    /**
     * Set a variable for the client's simplified scripting system.
     */
    function set_variable(name: string, value: unknown): void;
    /**
     * Delete a variable from the client's simplified scripting system.
     */
    function delete_variable(name: string): void;
    /**
     * Increment a variable from the client's simplified scripting system.
     */
    function inc_variable(name: string, by: number): void;
    /**
     * Decrement a variable from the client's simplified scripting system.
     */
    function dec_variable(name: string, by: number): void;
    /**
     * Multiply a variable from the client's simplified scripting system.
     */
    function mul_variable(name: string, by: number): void;
    /**
     * Divide a variable from the client's simplified scripting system.
     */
    function div_variable(name: string, by: number): void;
}
