//Focus.reference.builder.loadListByName('papas').then(function(data){Focus.dispatcher.dispatch({action: {type: "update",data: {papas: data}}})})

'use strict';

var refStoreGetter = require('focus-core').reference.getStore;
var builtInActionReferenceLoader = require('focus-core').reference.builtInAction;
var isEmpty = require('lodash/lang/isEmpty');
var referenceMixin = {
    /** @inheritdoc */
    /*  getDefaultProps: function getReferenceDefaultProps(){
    return {*/
    /**
    * Array which contains all the reference lists.
    * If the referenceNames are set into the object, they are set into the default props.
    * @type {Array}
    */
    /*  referenceNames: this.referenceNames || []
    };
    },*/
    getInitialState: function getInitialState() {
        return { reference: {} };
    },
    /**
    * Build actions associated to the reference.
    */
    _buildReferenceActions: function _buildReferenceActions() {
        this.action = this.action || {};
        this.action.loadReference = builtInActionReferenceLoader(this.referenceNames);
    },
    _loadReference: function _loadReference() {
        return this.action.loadReference();
    },
    /**
    * Build the reference names and set the store into the application.
    */
    _buildReferenceStoreConfig: function _buildReferenceStoreConfig() {
        //Get the store for references.
        var referenceStore = refStoreGetter();

        //If the reference store is empty don't do anything.
        if (isEmpty(this.referenceNames)) {
            return;
        }
        this.stores = this.stores || [];
        //Set as referencestore the referencestore of the application.
        this.stores.push({
            store: referenceStore,
            properties: this.referenceNames
        });
    },
    /**
    * Build store and actions related to the reference.
    */
    _buildReference: function _buildReference() {
        this._buildReferenceStoreConfig();
        this._buildReferenceActions();
    },
    /** @inheritdoc */
    componentWillMount: function componentWillMount() {
        this.referenceNames = this.props.referenceNames || this.referenceNames;
        this._buildReference();
    }
};

module.exports = referenceMixin;