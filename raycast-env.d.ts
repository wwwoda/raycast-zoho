/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `index` command */
  export type Index = ExtensionPreferences & {
  /** Organization ID - Organization ID */
  "organizationID": string,
  /** Client ID - Client ID */
  "clientId": string,
  /** Client Secret - Client Secret */
  "clientSecret": string,
  /** Refresh Token - Refresh Token */
  "refreshToken": string,
  /** Destination Path - Destination Path */
  "destPath": string
}
}

declare namespace Arguments {
  /** Arguments passed to the `index` command */
  export type Index = {}
}

