export = ConstraintsBuilder;
declare class ConstraintsBuilder {
    constraints: any[];
    /**
     * @param {SourceConstraint} sourceConstraint
     */
    withSourceConstraint(sourceConstraint: SourceConstraint): import("./constraints.builder");
    /**
     * @returns {Constraints}
     */
    build(): Constraints;
}
import SourceConstraint = require("./source.constraint");
import Constraints = require("./constraints");
