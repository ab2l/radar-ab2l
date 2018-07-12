import React from 'react';
import FilterElement from './filter-element';
import FilterType from './filter-type';
import Filters from '../lib/filter';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.filters = new Filters();
    this.filters.onChange = this.props.onChange;
  }

  render() {
    const { profiles } = this.props;

    this.filterElements = [];
    return (<div className="column is-one-quarter">
      <nav className="panel">
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="pesquisa"
              onChange={(event) => { this.filters.define('search', event.target.value); }}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <FilterElement
          filters={this.filters}
          profiles={profiles}
          name="Analytics e Jurimetria"
          id="analytics"
        />

        <FilterElement
          filters={this.filters}
          profiles={profiles}
          name="Automação e Gestão de Documentos"
          id="automacao"
        />

        <FilterElement
          filters={this.filters}
          profiles={profiles}
          name="Conteúdo Jurídico, Educação e Consultoria"
          id="conteudo"
        />

        <FilterElement
          filters={this.filters}
          name="Extração e monitoramento de dados públicos"
          id="extracao"
        />

        <FilterElement
          filters={this.filters}
          name="Gestão – Escritórios e Departamentos Jurídicos"
          id="gestao"
        />

        <FilterElement
          filters={this.filters}
          name="IA – Setor Público"
          id="iaSetorPublico"
        />

        <FilterElement
          filters={this.filters}
          name="Redes de Profissionais"
          id="redesProfissionais"
        />

        <FilterElement
          filters={this.filters}
          name="Resolução de conflitos online"
          id="resolucaoConflito"
        />

        <FilterElement
          filters={this.filters}
          name="Resolução de conflitos online"
          id="resolucaoConflito"
        />

        <FilterElement
          filters={this.filters}
          name="Compliance"
          id="compliance"
        />

        <FilterElement
          filters={this.filters}
          name="Tax"
          id="tax"
        />

        <FilterElement
          filters={this.filters}
          profiles={profiles}
          name="Regtech"
          id="regtech"
        />

      </nav>
    </div>);
  }
}
