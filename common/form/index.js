var builder = require('focus').component.builder;
var React = require('react');
var assign = require('object-assign');
var getEntityDefinition = require('focus').definition.entity.builder.getEntityInformations;
var builtInComponents = require('./mixin/built-in-components');
var storeBehaviour = require('./mixin/store-behaviour');
var actionBehaviour = require('./mixin/action-behaviour');

var isEmpty = require('lodash/lang/isEmpty');
/**
 * Mixin to create a block for the rendering.
 * @type {Object}
 */
var formMixin = {
  mixins: [builtInComponents, storeBehaviour, actionBehaviour],
  /** @inheritdoc */
  getDefaultProps: function getFormDefaultProps() {
    return {
      /**
       * Defines it the form can have  an edit mode.
       * @type {Boolean}
       */
      hasEdit: true,
      /**
       * Defines
       * @type {Boolean}
       */
      isEdit: false,
      /**
       * Style of the component.
       * @type {Object}
       */
      style: {}
    };
  },
  /** @inheritdoc */
  getInitialState: function getFormInitialState() {
    return {
      id: this.props.id
    };
  },
  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function onFormStoreChangeHandler() {
    this.setState(this._getStateFromStores());
  },

  /** @inheritdoc */
  componentWillMount: function formWillMount(){
    this._buildDefinition();
  },
  /** @inheritdoc */
  componentDidMount: function formDidMount() {
    //Build the definitions.
    this._registerListeners();
    if (this.registerListeners) {
      this.registerListeners();
    }
    if (this.callMountedActions) {
      this.callMountedActions();
    }
  },
  /** @inheritdoc */
  componentWillUnmount: function formWillMount() {
    this._unRegisterListeners();
    if (this.unregisterListeners) {
      this.unregisterListeners();
    }
  },
  /**
   * Build the entity definition givent the path of the definition.
   */
  _buildDefinition: function buildFormDefinition(){
    if(!this.definitionPath){
      throw new Error('the definition path should be defined to know the domain of your entity property.');
    }
    this.definition = getEntityDefinition(this.definitionPath, this.additionalDefinition);
  },
  /**
   * Validate the form information by information.
   * In case of errors the state is modified.
   * @returns {boolean} - A boolean ttue if the
   */
  validate: function validateForm() {
    var validationMap = {};
    for (var inptKey in this.refs) {
      assign(validationMap, {
        [inptKey]: this.refs[inptKey].validate()
      });
    }
    if(isEmpty(validationMap)){
      return true;
    }

    return false;
  },

  _className: function formClassName() {
    return `form-horizontal ${this.props.style.className}`;
  },

  /**
   * Handle the form submission.
   * @param {Event} e - React sanityze event from the form submit.
   */
  _handleSubmitForm: function handleSumbitForm(e) {
    e.preventDefault();
    if(this.validate()){
      this.action.save(this._getEntity());
    }
    //return false;
  },
    /** @inheritdoc */
  render: function renderForm() {
    return (
      <form
        onSubmit={this._handleSubmitForm}
        className={this._className()}
      >
        <fieldset>
          {this.renderContent()}
        </fieldset>
      </form>
    );
  }
};

module.exports = builder(formMixin);