// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/ada1df33d63c1cc16a18240d15e4df46974c9914/empower/index.d.ts
declare module 'empower' {
// Type definitions for empower 1.2.1
// Project: https://github.com/twada/empower
// Definitions by: vvakame <https://github.com/vvakame>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

function empower(originalAssert:any, formatter:any, options?:empower.Options):any;

export = empower;
export as namespace empower;

namespace empower {
    export interface Options {
        destructive?: boolean;
        modifyMessageOnRethrow?: boolean;
        saveContextOnRethrow?: boolean;
        patterns?: string[];
    }
}
}