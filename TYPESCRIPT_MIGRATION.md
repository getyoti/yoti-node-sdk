# TypeScript Migration Guide

This document describes the TypeScript-first setup for the Yoti Node SDK and provides guidance for migrating JavaScript files to TypeScript.

## Current Setup

The SDK now has a complete TypeScript infrastructure in place:

### Build Configuration

- **tsconfig.json**: Main TypeScript configuration with relaxed settings to allow JavaScript files
- **tsconfig.build.json**: Production build configuration extending the main config
- **Build Output**: `dist/` directory containing compiled JavaScript and type definitions (.d.ts files)

### npm Scripts

```json
{
  "build": "tsc -p tsconfig.build.json && npm run copy:proto",
  "build:watch": "tsc -p tsconfig.build.json --watch",
  "clean": "rm -rf dist",
  "lint": "npx eslint *.js './src/**/*.js' './tests/**/*.spec.js' config/*.js",
  "test": "jest",
  "prepublishOnly": "npm run clean && npm run build"
}
```

### What's Working

✅ TypeScript compiler compiles JavaScript source files  
✅ Generates type definitions (.d.ts) from all source files  
✅ Proto definitions are copied to dist/  
✅ All 193 test suites pass (1350 tests)  
✅ Linting works correctly  
✅ Source maps and declaration maps are generated  

## Migration Strategy

### Approach

The codebase can be migrated incrementally from JavaScript to TypeScript. The current setup supports both file types simultaneously, allowing for gradual conversion without breaking existing functionality.

### Recommended Order

1. **Data Types** (`src/data_type/`) - Self-contained classes with minimal dependencies
2. **Common Utilities** (`src/yoti_common/`) - Shared utilities used throughout the codebase
3. **Type Definitions** (`src/aml_type/`) - Simple type classes
4. **Request Handlers** (`src/request/`) - Request/response infrastructure
5. **Service Modules** - Convert service-by-service:
   - `src/aml_service/`
   - `src/profile_service/`
   - `src/dynamic_sharing_service/`
   - `src/digital_identity_service/`
   - `src/idv_service/`
6. **Client Classes** (`src/client/`) - Main client interfaces
7. **Proto Definitions** (`src/proto/`) - Protocol buffer handlers
8. **Configuration** (`config/`) - Configuration modules
9. **Entry Point** (`index.js`) - Main module exports

### Conversion Process

#### 1. Choose a File

Start with files that have minimal dependencies. Check imports to ensure dependencies are either already converted or are simple to convert.

#### 2. Create TypeScript Version

Create a `.ts` file with the same name:

```bash
# Example for src/data_type/date.js
cp src/data_type/date.js src/data_type/date.ts
```

#### 3. Update Syntax

Convert CommonJS to TypeScript:

**Before (JavaScript):**
```javascript
'use strict';

const Validation = require('../yoti_common/validation');

class MyClass {
  constructor(value) {
    this.value = value;
  }
  
  getValue() {
    return this.value;
  }
}

module.exports = {
  MyClass,
};
```

**After (TypeScript):**
```typescript
import Validation = require('../yoti_common/validation');

export class MyClass {
  private value: string;
  
  constructor(value: string) {
    this.value = value;
  }
  
  getValue(): string {
    return this.value;
  }
}
```

#### 4. Add Type Annotations

- Add parameter types
- Add return types
- Add property types
- Use TypeScript features (interfaces, enums, etc.)

#### 5. Handle Imports

For CommonJS modules that haven't been converted yet:

```typescript
// Use TypeScript's require syntax
import ModuleName = require('../path/to/module');

// Or if the module exports are compatible
import { NamedExport } from '../path/to/module';
```

#### 6. Build and Test

```bash
npm run clean
npm run build
npm test
npm run lint
```

#### 7. Remove Old File

Once tests pass, remove the JavaScript version:

```bash
git rm src/data_type/date.js
```

### Example Conversion

Here's a complete example of converting a simple class:

**Original JavaScript (src/example.js):**
```javascript
'use strict';

const Validation = require('./validation');

/**
 * Example class
 * @class Example
 */
class Example {
  /**
   * @param {string} name
   * @param {number} value
   */
  constructor(name, value) {
    Validation.isString(name, 'name');
    Validation.isNumber(value, 'value');
    
    /** @private */
    this.name = name;
    /** @private */
    this.value = value;
  }
  
  /**
   * @returns {string}
   */
  getName() {
    return this.name;
  }
  
  /**
   * @returns {number}
   */
  getValue() {
    return this.value;
  }
  
  /**
   * @param {number} amount
   * @returns {Example}
   */
  increment(amount) {
    return new Example(this.name, this.value + amount);
  }
}

module.exports = {
  Example,
};
```

**Converted TypeScript (src/example.ts):**
```typescript
import Validation = require('./validation');

/**
 * Example class
 */
export class Example {
  private readonly name: string;
  private readonly value: number;
  
  /**
   * @param name - The name identifier
   * @param value - The numeric value
   */
  constructor(name: string, value: number) {
    Validation.isString(name, 'name');
    Validation.isNumber(value, 'value');
    
    this.name = name;
    this.value = value;
  }
  
  /**
   * Gets the name
   * @returns The name identifier
   */
  getName(): string {
    return this.name;
  }
  
  /**
   * Gets the value
   * @returns The numeric value
   */
  getValue(): number {
    return this.value;
  }
  
  /**
   * Creates a new instance with an incremented value
   * @param amount - The amount to increment by
   * @returns A new Example instance
   */
  increment(amount: number): Example {
    return new Example(this.name, this.value + amount);
  }
}
```

### TypeScript Best Practices

1. **Use strict mode**: Enable strict type checking for new TypeScript files
2. **Avoid `any`**: Use specific types or `unknown` instead
3. **Use readonly**: Mark immutable properties as `readonly`
4. **Export explicitly**: Use named exports rather than default exports
5. **Document types**: Keep JSDoc comments for better IDE support
6. **Interfaces over types**: Prefer `interface` for object shapes that might be extended
7. **Enums for constants**: Convert constant objects to TypeScript enums where appropriate

### Testing TypeScript Code

Tests can remain in JavaScript initially. The compiled JavaScript output in `dist/` will work with existing tests. To convert tests to TypeScript:

1. Rename `.spec.js` to `.spec.ts`
2. Add type annotations
3. Update imports to use TypeScript syntax
4. Run tests to verify

### Common Issues

#### Import/Export Mismatches

**Problem**: `Cannot find module or its type declarations`

**Solution**: Check if the imported module uses CommonJS or ES modules. Use the appropriate import syntax:

```typescript
// For CommonJS modules
import ModuleName = require('./module');

// For ES modules or TypeScript files
import { NamedExport } from './module';
```

#### Type Definition Errors

**Problem**: `Property 'x' does not exist on type 'Y'`

**Solution**: Add proper type definitions or interfaces. Check the generated `.d.ts` files in `dist/` for reference.

#### Circular Dependencies

**Problem**: `ReferenceError: Cannot access 'X' before initialization`

**Solution**: Refactor to break circular dependencies, or use type-only imports:

```typescript
import type { MyType } from './module';
```

## Progressive Enhancement

The migration can be done gradually:

1. **Phase 1**: Infrastructure (✅ Complete)
   - TypeScript configuration
   - Build scripts
   - Type generation from JavaScript

2. **Phase 2**: Core Utilities (In Progress)
   - Data types
   - Common utilities
   - Validation helpers

3. **Phase 3**: Services
   - Individual service modules
   - Request/response handlers

4. **Phase 4**: Clients
   - Main client classes
   - Integration points

5. **Phase 5**: Complete Migration
   - Entry points
   - Configuration
   - Tests
   - Enable strict mode globally

## Benefits of TypeScript-First

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Documentation**: Types serve as living documentation
- **Maintainability**: Easier to understand and modify code
- **Modern Features**: Access to latest JavaScript features with compatibility

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
