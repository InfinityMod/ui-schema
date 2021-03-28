import {createOrderedMap} from '@ui-schema/ui-schema';

export const schemaDemoTable = createOrderedMap({
    type: 'array',
    widget: 'Table',
    view: {
        dense: true,
    },
    items: {
        type: 'array',
        items: [
            {
                type: 'string',
                title: 'Name',
            },
            {
                type: 'integer',
                title: 'ID',
                //hidden: true,
                view: {
                    align: 'center',
                },
            },
            {
                type: 'string',
                format: 'date',
                title: 'Date',
                view: {
                    shrink: true,
                },
            },
            {
                type: 'number',
                title: 'Revenue',
                default: 0,
                multipleOf: 0.1,
            },
            {
                type: 'boolean',
                title: 'Finished',
                default: true,
            },
        ],
    },
});

export const schemaDemoTableMap = createOrderedMap({
    type: 'array',
    widget: 'Table',
    view: {
        dense: true,
    },
    items: {
        type: 'object',
        rowSortOrder: [
            'id',
            'date',
            'name',
            'revenue',
            'finished',
        ],
        properties: {
            name: {
                type: 'string',
                title: 'Name',
            },
            id: {
                type: 'integer',
                title: 'ID',
                //hidden: true,
            },
            date: {
                type: 'string',
                format: 'date',
                title: 'Date',
                view: {
                    shrink: true,
                },
            },
            revenue: {
                type: 'number',
                title: 'Revenue',
                multipleOf: 0.1,
            },
            finished: {
                type: 'boolean',
                title: 'Finished',
                default: true,
            },
        },
    },
});

export const schemaDemoTableAdvanced = createOrderedMap({
    type: 'object',
    widget: 'TableAdvanced',
    properties: {
        name: {
            type: 'string',
        },
        options: {
            type: 'object',
            properties: {
                filter: {
                    limit: {
                        type: 'number',
                    },
                },
                summary: {
                    type: 'array',
                    items: {
                        type: 'number',
                    },
                },
                pagination: {
                    limit: {
                        type: 'number',
                    },
                },
            },
        },
        data: {
            type: 'array',
            widget: 'Table',
            default: [
                [
                    'Projekt No1',
                    2,
                    {
                        'from': '2021-03-11',
                        'till': '2021-03-27',
                    },
                    150.6,
                ],
            ],
            view: {
                dense: true,
                hideTitle: true,
                //hideItemsTitle: true,
            },
            items: {
                type: 'array',
                items: [
                    {
                        type: 'string',
                        title: 'Name',
                    },
                    {
                        type: 'integer',
                        title: 'ID',
                    },
                    {
                        type: 'object',
                        title: 'DateRange',
                        properties: {
                            from: {
                                type: 'string',
                                format: 'date',
                                title: 'Date From',
                                view: {
                                    shrink: true,
                                    sizeXs: 6,
                                },
                            },
                            till: {
                                type: 'string',
                                format: 'date',
                                title: 'Date Till',
                                view: {
                                    shrink: true,
                                    sizeXs: 6,
                                },
                            },
                        },
                    },
                    /*{
                        type: 'array',
                        widget: 'GenericList',
                        title: 'GenericList',
                        items: [
                            {
                                type: 'string',
                                format: 'date',
                                view: {
                                    shrink: true,
                                    sizeXs: 6,
                                },
                            },
                            {
                                type: 'string',
                                format: 'date',
                                view: {
                                    shrink: true,
                                    sizeXs: 6,
                                },
                            },
                        ],
                    },*/
                    /*{
                        type: 'array',
                        widget: 'SimpleList',
                        title: 'SimpleList',
                        items: {
                            type: 'string',
                            view: {
                                shrink: true,
                                hideTitle: true,
                            },
                        },
                    },*/
                    {
                        type: 'number',
                        title: 'Revenue',
                        multipleOf: 0.01,
                    },
                ],
            },
        },
    },
});
