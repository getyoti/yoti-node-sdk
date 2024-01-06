export = ConstraintsBuilder;
declare class ConstraintsBuilder {
    /** @private */
    private constraints;
    /**
     * @param {SourceConstraint} sourceConstraint
     */
    withSourceConstraint(sourceConstraint: SourceConstraint): this;
    /**
     * @returns {Constraints}
     */
    build(): Constraints;
}
import SourceConstraint = require("./source.constraint");
import Constraints = require("./constraints");
