(function () {
  const { createElement: e, useState, useEffect, Fragment } = React;

  const SEARCH_ORIGIN = 'https://search.modelshub.johnsnowlabs.com';

  const tasks = [
    'Named Entity Recognition',
    'Text Classification',
    'Sentiment Analysis',
    'Assertion Status',
    'Entity Resolution',
    'Translation',
    'Question Answering',
    'Summarization',
    'Sentence Detection',
    'Embeddings',
    'Language Detection',
    'Deidentification',
    'Stop Words',
    'Word Segmentation',
    'POS',
    'Lemmatization',
    'Relation Extraction',
    'Pipeline Healthcare',
    'Pipeline Translate',
    'Pipeline Onto NER',
    'Pipeline Language Detection',
  ];

  const languages = [
    'aav',
    'af',
    'afa',
    'alv',
    'ar',
    'art',
    'ase',
    'az',
    'bat',
    'bcl',
    'bem',
    'ber',
    'bg',
    'bi',
    'bn',
    'bnt',
    'br',
    'bzs',
    'ca',
    'cau',
    'ccs',
    'ceb',
    'cel',
    'chk',
    'cn',
    'cpf',
    'cpp',
    'crs',
    'cs',
    'cus',
    'cy',
    'da',
    'de',
    'dra',
    'ee',
    'efi',
    'el',
    'en',
    'eo',
    'es',
    'et',
    'eu',
    'euq',
    'fa',
    'fi',
    'fiu',
    'fj',
    'fr',
    'ga',
    'gaa',
    'gem',
    'gil',
    'gl',
    'gmq',
    'gmw',
    'grk',
    'guw',
    'gv',
    'ha',
    'he',
    'hi',
    'hil',
    'ho',
    'ht',
    'hu',
    'hy',
    'id',
    'ig',
    'iir',
    'ilo',
    'inc',
    'ine',
    'is',
    'iso',
    'it',
    'itc',
    'ja',
    'jap',
    'ka',
    'kab',
    'kg',
    'kj',
    'kl',
    'ko',
    'kqn',
    'kwn',
    'kwy',
    'la',
    'lg',
    'ln',
    'loz',
    'lu',
    'lua',
    'lue',
    'lun',
    'luo',
    'lus',
    'lv',
    'map',
    'mfe',
    'mg',
    'mh',
    'mk',
    'mkh',
    'ml',
    'mos',
    'mr',
    'mt',
    'mul',
    'nb',
    'ner',
    'ng',
    'nic',
    'niu',
    'nl',
    'nn',
    'no',
    'nso',
    'ny',
    'nyk',
    'om',
    'pa',
    'pag',
    'pap',
    'phi',
    'pis',
    'pl',
    'pon',
    'poz',
    'pqe',
    'pqw',
    'pt',
    're',
    'rn',
    'rnd',
    'ro',
    'roa',
    'ru',
    'run',
    'rw',
    'sal',
    'sem',
    'sg',
    'sit',
    'sk',
    'sl',
    'sla',
    'sm',
    'sn',
    'so',
    'sq',
    'srn',
    'ss',
    'st',
    'sv',
    'sw',
    'swc',
    'taw',
    'tdt',
    'th',
    'ti',
    'tiv',
    'tl',
    'tll',
    'tn',
    'to',
    'toi',
    'tpi',
    'tr',
    'trk',
    'ts',
    'tum',
    'tut',
    'tvl',
    'tw',
    'ty',
    'uk',
    'umb',
    'ur',
    'urj',
    've',
    'vi',
    'wa',
    'wal',
    'war',
    'wls',
    'xh',
    'xx',
    'yap',
    'yo',
    'zh',
    'zle',
    'zls',
    'zlw',
    'zu',
  ];

  const editions = [
    'Spark NLP 2.4.0',
    'Spark NLP 2.4.1',
    'Spark NLP 2.4.2',
    'Spark NLP 2.4.3',
    'Spark NLP 2.4.4',
    'Spark NLP 2.4.5',
    'Spark NLP 2.5.0',
    'Spark NLP 2.5.1',
    'Spark NLP 2.5.2',
    'Spark NLP 2.5.3',
    'Spark NLP 2.5.4',
    'Spark NLP 2.5.5',
    'Spark NLP 2.6.0',
    'Spark NLP 2.6.1',
    'Spark NLP 2.6.2',
    'Spark NLP 2.6.3',
    'Spark NLP 2.6.4',
    'Spark NLP 2.6.5',
    'Spark NLP 2.7.0',
    'Spark NLP for Healthcare 2.4.0',
    'Spark NLP for Healthcare 2.4.1',
    'Spark NLP for Healthcare 2.4.2',
    'Spark NLP for Healthcare 2.4.5',
    'Spark NLP for Healthcare 2.4.6',
    'Spark NLP for Healthcare 2.5.0',
    'Spark NLP for Healthcare 2.5.2',
    'Spark NLP for Healthcare 2.5.3',
    'Spark NLP for Healthcare 2.5.5',
    'Spark NLP for Healthcare 2.6.0',
    'Spark NLP for Healthcare 2.6.2',
    'Spark NLP for Healthcare 2.7.0',
    'Spark NLP for Healthcare 2.7.1',
    'Spark NLP for Healthcare 2.7.2',
  ];

  const useFilterQuery = () => {
    const [state, setState] = useState({
      value: 'idle',
      context: {},
    });

    const [params, setParams] = useState({});

    useEffect(() => {
      setState({ ...state, value: 'loading' });
      const searchParams = Object.keys(params).reduce((acc, k) => {
        if (params[k] && k !== 'type') {
          acc.append(k, params[k]);
        }
        return acc;
      }, new URLSearchParams());
      fetch(SEARCH_ORIGIN + '/?' + searchParams)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Search is not available at the moment.');
        })
        .then(({ data, meta }) => {
          setState({
            value: 'success',
            context: { data, meta },
          });
        })
        .catch((e) => {
          setState({
            value: 'failure',
            context: { error: e.message },
          });
        })
        .finally(() => {
          if (params.page) {
            document
              .getElementById('app')
              .scrollIntoView({ behavior: 'smooth' });
          }
        });
    }, [params]);

    const dispatch = (event) => {
      if (state.value === 'loading') {
        return;
      }
      switch (event.type) {
        case 'SUBMIT':
          {
            const { task, language, edition } = event;
            setParams({ task, language, edition });
          }
          break;

        case 'CHANGE_PAGE':
          {
            const { page } = event;
            setParams({ ...params, page });
          }
          break;
      }
    };
    return [state, dispatch];
  };

  const Pagination = ({ page, totalPages, onChange }) => {
    if (totalPages <= 1) {
      return null;
    }
    return e('div', { className: 'pagination' }, [
      e(
        'a',
        {
          key: 'first',
          className: 'pagination__button',
          disabled: page <= 1,
          onClick: () => {
            onChange(1);
          },
        },
        'first'
      ),
      e(
        'a',
        {
          key: 'prev',
          className: 'pagination__button',
          disabled: page <= 1,
          onClick: () => {
            onChange(page - 1);
          },
        },
        'previous'
      ),
      e(
        'span',
        { key: 'text', className: 'pagination__text' },
        page + ' page of ' + totalPages
      ),
      e(
        'a',
        {
          key: 'next',
          className: 'pagination__button',
          disabled: page >= totalPages,
          onClick: () => {
            onChange(page + 1);
          },
        },
        'next'
      ),
      e(
        'a',
        {
          key: 'last',
          className: 'pagination__button',
          disabled: page >= totalPages,
          onClick: () => {
            onChange(totalPages);
          },
        },
        'last'
      ),
    ]);
  };

  const ModelItemList = ({ meta, children, onPageChange }) => {
    return ReactDOM.createPortal(
      e(Fragment, null, [
        e('div', { key: 0, className: 'grid--container model-items' }, [
          e('div', { key: 0, className: 'grid' }, children),
          e(Pagination, { key: 1, ...meta, onChange: onPageChange }),
        ]),
      ]),

      document.getElementById('results')
    );
  };

  const ModelItemTag = ({ icon, name, value }) => {
    return e('div', { className: 'model-item__tag' }, [
      e(
        'span',
        { key: 'icon', className: 'model-item__tag-icon' },
        e('i', { className: 'far fa-' + icon })
      ),
      e('span', { key: 'name', className: 'model-item__tag-name' }, name + ':'),
      e('strong', { key: 'value', className: 'model-item__tag-value' }, value),
    ]);
  };

  const ModelItem = ({ title, url, task, language, edition }) => {
    return e(
      'div',
      { className: 'cell cell--12 cell--md-6 cell--lg-4' },
      e('div', { className: 'model-item' }, [
        e(
          'div',
          { key: 'header', className: 'model-item__header' },
          e('a', { href: url, className: 'model-item__title', title }, title)
        ),
        e('div', { key: 'content', className: 'model-item__content' }, [
          e(ModelItemTag, { key: 0, icon: 'edit', name: 'Task', value: task }),
          e(ModelItemTag, {
            key: 1,
            icon: 'flag',
            name: 'Language',
            value: language,
          }),
          e(ModelItemTag, {
            key: 2,
            icon: 'clone',
            name: 'Edition',
            value: edition,
          }),
        ]),
      ])
    );
  };

  const FilterForm = ({ onSubmit, isLoading }) => {
    return e(
      'form',
      { className: 'filter-form models-hero__group', onSubmit },
      [
        e('span', { key: 0, className: 'filter-form__group' }, [
          e('span', { key: 0, className: 'filter-form__text' }, 'Show'),
          e(
            'select',
            {
              key: 1,
              name: 'task',
              className: 'select filter-form__select filter-form__select--task',
            },
            tasks.reduce(
              (acc, task) => {
                acc.push(e('option', { key: task, value: task }, task));
                return acc;
              },
              [[e('option', { key: 0, value: '' }, 'Task')]]
            )
          ),
        ]),
        e('span', { key: 1, className: 'filter-form__group' }, [
          e(
            'span',
            { key: 0, className: 'filter-form__text' },
            'models & pipelines in'
          ),
          e(
            'select',
            {
              key: 1,
              name: 'language',
              className:
                'select filter-form__select filter-form__select--language',
            },
            languages.reduce(
              (acc, language) => {
                acc.push(
                  e('option', { key: language, value: language }, language)
                );
                return acc;
              },
              [[e('option', { key: 0, value: '' }, 'Language')]]
            )
          ),
        ]),
        e('span', { key: 2, className: 'filter-form__group' }, [
          e('span', { key: 0, className: 'filter-form__text' }, 'for'),
          e(
            'select',
            {
              key: 1,
              name: 'edition',
              className:
                'select filter-form__select filter-form__select--edition',
            },
            editions.reduce(
              (acc, edition) => {
                acc.push(
                  e('option', { key: edition, value: edition }, edition)
                );
                return acc;
              },
              [[e('option', { key: 0, value: '' }, 'Spark NLP edition')]]
            )
          ),
          e(
            'button',
            {
              key: 2,
              type: 'submit',
              className: 'button filter-form__button',
            },
            isLoading ? '...' : 'Go'
          ),
        ]),
      ]
    );
  };

  const SearchAndUpload = () => {
    return e(
      'div',
      {
        className: 'models-hero__group models-hero__group--search-and-upload',
      },
      e(
        'div',
        {
          className: 'models-hero__item models-hero__item--search',
        },
        e(
          'form',
          {
            className: 'search-form',
          },
          e('input', {
            type: 'text',
            className: 'search-form__input',
            placeholder: 'Search models and pipelines',
          }),
          e(
            'button',
            {
              className: 'button search-form__button',
            },
            'Search'
          )
        )
      ),
      e(
        'div',
        {
          className: 'models-hero__item models-hero__item--upload',
        },
        e(
          'a',
          {
            href: 'https://modelshub.johnsnowlabs.com/',
            className: 'button models-hero__upload-button',
          },
          e('i', {
            className: 'fa fa-upload',
          }),
          '\xA0 Upload Your Model'
        )
      )
    );
  };

  const App = () => {
    const [state, send] = useFilterQuery();

    const handleFilterSubmit = (e) => {
      e.preventDefault();
      const {
        target: {
          task: { value: task },
          language: { value: language },
          edition: { value: edition },
        },
      } = e;
      send({ type: 'SUBMIT', task, language, edition });
    };

    const handlePageChange = (page) => {
      send({ type: 'CHANGE_PAGE', page });
    };

    let result;
    switch (true) {
      case Boolean(state.context.data):
        {
          let children;
          if (state.context.data.length > 0) {
            children = state.context.data.map((item) =>
              e(ModelItem, { key: item.url, ...item })
            );
          } else {
            children = e(
              'div',
              { className: 'model-items__no-results' },
              'Sorry, but there are no results. Try other filtering options.'
            );
          }
          result = e(ModelItemList, {
            key: 'model-items',
            meta: state.context.meta,
            onPageChange: handlePageChange,
            children,
          });
        }
        break;

      case Boolean(state.context.error):
        break;

      default:
        break;
    }

    return e(React.Fragment, null, [
      e(FilterForm, {
        key: 0,
        onSubmit: handleFilterSubmit,
        isLoading: state.value === 'loading',
      }),
      e(SearchAndUpload, { key: 1 }),
      result,
    ]);
  };

  ReactDOM.render(e(App), document.getElementById('app'));
})();
