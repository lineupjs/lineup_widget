// Copyright (c) Samuel Gratzl.
// Distributed under the terms of the MIT License.

/**
 * The version of the attribute spec that this package
 * implements. This is the value used in
 * _model_module_version/_view_module_version.
 *
 * Update this value when attributes are added/removed from
 * your models, or serialized format changes.
 */
var pkg_json = require("../package.json");

export const JUPYTER_EXTENSION_VERSION = pkg_json.version;
