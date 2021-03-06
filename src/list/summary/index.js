import React from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import {translate} from 'focus-core/translation';

const styleBehaviour = require('../../mixin/stylable');
const TopicDisplayer = require('../../common/topic-displayer').component;
const Button = require('../../common/button/action').component;
import numberFormatter from 'focus-core/definition/formatter/number';

const listSummaryMixin = {
    mixins: [styleBehaviour],
    /**
     * Display name.
     */
    displayName: 'ListSummary',

    /**
     * Init the default props.
     * @returns {objet} default props.
     */
    getDefaultProps () {
        return {
            scopeList: {}
        };
    },
    /** @inheritdoc */
    propTypes: {
        nb: types('number'),
        queryText: types('string'),
        scopeList: types('object').isRequired,
        scopeClickAction: types('func'),
        exportAction: types('func')
    },
    /**
     * Return result sentence.
     * @return {object} Result sentence
     */
    _getResultSentence() {
        const {nb, queryText} = this.props;
        const hasText = queryText && queryText.trim().length > 0;
        return (
            <span>
                <strong>{numberFormatter.format(nb)}&nbsp;</strong>
                <span>{translate('result.for')}
                {hasText &&
                    <span className='search-text'>&#171;&nbsp;{queryText}&nbsp;&#187;</span>
                }
                </span>
            </span>
        );
    },
    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render() {
        const {exportAction, scopeList, scopeClickAction} = this.props;
        return (
            <div data-focus="list-summary">
                {exportAction &&
                    <div className="print">
                        <Button handleOnClick={exportAction} icon="print" label="result.export" shape={null} />
                    </div>
                }
                <span className="sentence">{this._getResultSentence()}</span>
                <span className="topics">
                    <TopicDisplayer topicClickAction={scopeClickAction} topicList={scopeList} />
                </span>
            </div>
        );
    }
};

module.exports = builder(listSummaryMixin);
