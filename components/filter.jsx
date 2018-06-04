import React from 'react';
import FilterElement from './filter-element';
import FilterType from './filter-type';

export default class Filter extends React.Component {
  clearState() {
    this.filterElements.forEach(x => x.active(false));
    this.filterType.clearState();
  }

  render() {
    this.filterElements = [];
    return (<div className="column is-one-quarter">
      <nav className="panel">
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input is-small" type="text" placeholder="pesquisa" />
            <span className="icon is-small is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>
        <FilterType ref={(e) => { this.filterType = e; }} />

        <FilterElement
          ref={e => this.filterElements.push(e)}
          name="Analytics e Jurimetria"
          id="analytics"
        />

        <FilterElement
          ref={e => this.filterElements.push(e)}
          name="Automação e Gestão de Documentos"
          id="automacao"
        />

        <FilterElement
          ref={e => this.filterElements.push(e)}
          name="Conteúdo Jurídico, Educação e Consultoria"
          id="conteudo"
        />

        <FilterElement
          ref={e => this.filterElements.push(e)}
          name="Extração e monitoramento de dados públicos"
          id="extracao"
        />

        <FilterElement
          ref={e => this.filterElements.push(e)}
          name="Gestão – Escritórios e Departamentos Jurídicos"
          id="gestao"
        />

        <FilterElement
          ref={e => this.filterElements.push(e)}
          name="IA – Setor Público"
          id="iaSetorPublico"
        />

        <FilterElement
          ref={e => this.filterElements.push(e)}
          name="Redes de Profissionais"
          id="redesProfissionais"
        />

        <FilterElement
          ref={e => this.filterElements.push(e)}
          name="Resolução de conflitos online"
          id="resolucaoConflito"
        />

        <div className="panel-block">
          <button
            onClick={() => this.clearState()}
            className="button is-link is-outlined is-fullwidth"
          >apagar filtros</button>
        </div>
      </nav>
    </div>);
  }
}
