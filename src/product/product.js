
/**
 * Represents a product and provides methods for operations
 * on the instance.
 */
export default class Product {

    /**
     * @param {String} name
     * @param {String} manufacturer
     * @param {String} model
     * @param {String} family
     * @param {String} announcedDate
     */
    constructor(name, manufacturer, model, family, announcedDate) {
        this._name = name;
        this._manufacturer = manufacturer;
        this._model = model;
        this._family = family;
        this._announcedDate = announcedDate;
        this._announcedTimestamp = new Date(announcedDate).getTime();
    }

    // REAL METHODS GO HERE
    hasFamily() {
        return this.family !== undefined;
    }

    /**
     * Creates a {Product} instance from a JSON Object
     *
     * @returns {Product}
     */
    static fromJSON(json) {
        return new Product(
            json.product_name,
            json.manufacturer,
            json.model,
            json.family,
            json['announced-date']
        );
    }

    /**
     * @returns {Object} The JSON representation of a product instance.
     */
    toJSON() {
        return {
            'product_name'      : this._name,
            'manufacturer'      : this._manufacturer,
            'model'             : this._model,
            'family'            : this._family,
            'announced-date'    : this._announcedDate
        };
    }

    /**
     * @return {String} The name of the product.
     */
    get name() {
        return this._name.trim().toLowerCase();
    }

    /**
     * @return {String} The manufacturer of the product.
     */
    get manufacturer() {
        return this._manufacturer.trim().toLowerCase();
    }

    /**
     * @return {String} The model name of the product.
     */
    get model() {
        return this._model.trim().toLowerCase();
    }

    /**
     * @return {String} The family name of the product.
     */
    get family() {
        return this._family && this._family.trim().toLowerCase();
    }

    /**
     * @return {String} The string representation of when the product was announced.
     */
    get announcedDate() {
        return this._announcedDate.trim();
    }

    /**
     * @return {Number} A Timestamp for announcedDate.
     */
    get announcedTimestamp() {
        return this._announcedTimestamp;
    }
}