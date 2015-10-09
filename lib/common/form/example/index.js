'use strict';

var actionBuilder = Focus.application.actionBuilder;
var Block = FocusComponents.common.block.component;
var formMixin = FocusComponents.common.form.mixin;
var Panel = FocusComponents.common.panel.component;
var MessageCenter = FocusComponents.application.messageCenter.component;

/***********************************************************************************************************************/
/* to test internationalisation. */
var resources = {
    dev: {
        translation: {
            'button': {
                'edit': 'Editer',
                'save': 'Sauvegarder',
                'cancel': 'Abandonner'
            },
            'select': {
                'yes': 'Oui',
                'no': 'Non',
                'unSelected': '-'
            },
            'contact': {
                'firstName': 'Prénom',
                'lastName': 'Nom',
                'papaCOde': 'Le code du papa',
                'monkeyCode': 'Le code du singe',
                'bio': 'Biography',
                'isCool': 'Est-il cool ?',
                'isNice': 'Est-il gentil ?',
                'birthDate': 'Date de naissance',
                'city': 'Lieu de naissance'
            }
        }
    }
};

i18n.init({ resStore: resources });

/***********************************************************************************************************************/
// TODO PBN : refactor loading of init domains and ref in a global way
//Load dependencies.
var domain = {
    'DO_TEXT': {
        style: 'do_text',
        type: 'text',
        component: 'PapaSinge',
        validator: [{
            type: 'function',
            options: {
                translationKey: 'domain.doTEXT.test'
            },
            value: function value(d) {
                return _.isString(d);
            }
        }]
    },
    'DO_EMAIL': {
        style: 'do_email',
        type: 'email',
        component: 'PapaMail',
        validator: [{
            type: 'function',
            value: function value() {
                return true;
            }
        }]
    },
    'DO_DATE': {
        'InputComponent': FocusComponents.components.input.Date,
        'formatter': function formatter(date) {
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            date = new Date(date);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return "" + day + " " + monthNames[monthIndex] + " " + year;
        },
        'locale': {
            format: 'L',
            months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
            monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
            weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
            weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
            weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
            },
            calendar: {
                sameDay: '[Aujourd\'hui à] LT',
                nextDay: '[Demain à] LT',
                nextWeek: 'dddd [à] LT',
                lastDay: '[Hier à] LT',
                lastWeek: 'dddd [dernier à] LT',
                sameElse: 'L'
            },
            relativeTime: {
                future: 'dans %s',
                past: 'il y a %s',
                s: 'quelques secondes',
                m: 'une minute',
                mm: '%d minutes',
                h: 'une heure',
                hh: '%d heures',
                d: 'un jour',
                dd: '%d jours',
                M: 'un mois',
                MM: '%d mois',
                y: 'un an',
                yy: '%d ans'
            },
            ordinalParse: /\d{1,2}(er|)/,
            ordinal: function ordinal(number) {
                return number + (number === 1 ? 'er' : '');
            },
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 4 // The week that contains Jan 4th is the first week of the year.
            }
        }
    },
    'DO_OUI_NON': {
        SelectComponent: FocusComponents.common.select.radio.component,
        refContainer: { yesNoList: [{ code: true, label: "select.yes" }, { code: false, label: "select.no" }] },
        listName: 'yesNoList'
    }
};
Focus.definition.domain.container.setAll(domain);
/*global focus*/
var entities = {
    "contact": {
        "firstName": {
            "domain": "DO_TEXT",
            "required": false,
            "validator": [{ options: { translationKey: 'entityContactValidation.test' }, type: 'function', value: function value(data) {
                    return data.length <= 3 ? false : true;
                } }]
        },
        "lastName": {
            "domain": "DO_TEXT",
            "required": true
        },
        "papaCode": {
            "domain": "DO_TEXT",
            "required": true
        },
        "age": {
            "domain": "DO_NUMBER",
            "required": false,
            "type": "number"
        },
        "email": {
            "domain": "DO_EMAIL",
            "required": false
        },
        "bio": {
            "domain": "DO_EMAIL",
            "InputComponent": FocusComponents.common.input.textarea.component
        },
        "isCool": {
            "domain": "DO_OUI_NON"
        },
        "isNice": {
            "domain": "DO_BOOLEAN",
            "FieldComponent": FocusComponents.common.input.toggle.component
        },
        "birthDate": {
            "domain": "DO_DATE"
        },
        "city": {
            "domain": "DO_TEXT"
        }
    },
    "commande": {
        "name": {
            "domain": "DO_TEXT",
            "required": true
        },
        "number": {
            "domain": "DO_NUMBER",
            "required": false,
            "type": "number"
        }
    }
};
Focus.definition.entity.container.setEntityConfiguration(entities);

function loadRefList(name) {
    return function loadRef() {
        var refLst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (cd) {
            return {
                code: '' + cd,
                label: '' + cd + ' ' + name
            };
        });
        return Promise.resolve(refLst);
    };
}
function loadMonkeyList() {
    return loadRefList('monkey')().then(function (data) {
        return data.map(function (element) {
            return { myCustomCode: element.code, myCustomLabel: element.label };
        });
    });
}

Focus.reference.config.set({ papas: loadRefList('papas'), singe: loadRefList('singe'), monkeys: loadMonkeyList });
Focus.definition.entity.container.setEntityConfiguration(entities);
/***********************************************************************************************************************/

var ListLine = React.createClass({
    displayName: 'ListLine',

    mixins: [FocusComponents.list.selection.line.mixin],
    definitionPath: "commande",
    renderLineContent: function renderLineContent(data) {
        var firstName = this.displayFor("name", {});
        var lastName = this.displayFor("number", {});
        return React.createElement(
            'div',
            null,
            firstName,
            ' ',
            lastName
        );
    }
});

var contactStore = new Focus.store.CoreStore({
    definition: {
        'contact': 'contact',
        'commandes': 'commande'
    }
});

var jsonContact = {
    firstName: "Zeus",
    lastName: "God",
    isCool: true,
    birthDate: new Date().toISOString(),
    commandes: [{
        name: "commande1",
        number: "1"
    }, {
        name: "commande2",
        number: "2"
    }, {
        name: "commande3",
        number: "3"
    }, {
        name: "commande4",
        number: "4"
    }, {
        name: "commande5",
        number: "5"
    }, {
        name: "commande6",
        number: "6"
    }],
    city: 'PAR'
};

var action = {
    load: actionBuilder({
        status: 'loaded',
        node: 'contact',
        service: function service() {
            return new Promise(function (s, e) {
                _.delay(function () {
                    s(jsonContact);
                }, 1);
            }); //Promise.resolve(jsonContact);
        }
    }),
    save: actionBuilder({
        status: 'saved',
        preStatus: 'saving',
        node: 'contact',
        service: function service(data) {
            console.log('save', data);
            return Promise.resolve(data);
        }
    })
};

var autocompleteData = [{
    code: 'PAR',
    value: 'Paris'
}, {
    code: 'LON',
    value: 'Londres'
}, {
    code: 'NY',
    value: 'New york'
}];

var codeResolver = function codeResolver(code) {
    return new Promise(function (success) {
        var candidate = _.find(autocompleteData, { code: code });
        success(candidate ? candidate.value : 'Unresolved code');
    });
};

var searcher = function searcher(text) {
    return new Promise(function (success) {
        _.delay(function () {
            var result = autocompleteData.filter(function (item) {
                return text === '' || item.value.toLowerCase().indexOf(text.toLowerCase()) !== -1;
            });
            success(result);
        }, 1);
    });
};

var FormExample = React.createClass({
    displayName: "FormExample",
    mixins: [formMixin],
    stores: [{
        store: contactStore,
        properties: ["contact", "commandes"]
    }],
    definitionPath: "contact",
    action: action,
    referenceNames: ['papas', 'monkeys'],

    /**
    * Render content form.
    * @return {ReactDOMNode} node REACT
    */
    renderContent: function renderContent() {
        return React.createElement(
            Block,
            { title: 'Fiche de l\'utilisateur', actions: this._renderActions },
            this.fieldFor("firstName"),
            this.fieldFor("lastName"),
            this.fieldFor("birthDate"),
            this.fieldFor('papaCode', { listName: 'papas' }),
            this.fieldFor('monkeyCode', { listName: 'monkeys', valueKey: 'myCustomCode', labelKey: 'myCustomLabel' }),
            this.fieldFor("bio"),
            this.fieldFor("isCool"),
            this.fieldFor("isNice"),
            this.textFor("birthDate", {
                formatter: function formatter(date) {
                    return "formatted date" + date;
                }
            })
        );
    }
});

return React.createElement(
    'div',
    null,
    React.createElement(MessageCenter, null),
    React.createElement(FormExample, { isEdit: false })
);