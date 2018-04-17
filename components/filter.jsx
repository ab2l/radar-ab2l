import React from 'react';
import FilterElement from './filter-element';
import FilterCompanyType from './filter-company-type';

export default class Filter extends React.Component {
  render() {
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
        <FilterCompanyType />

        <FilterElement
          name="Analytics e Jurimetria"
          id="analytics"
        />

        <FilterElement
          name="Automação e Gestão de Documentos"
          id="automacao"
        />

        <FilterElement
          name="Conteúdo Jurídico, Educação e Consultoria"
          id="conteudo"
        />

        <FilterElement
          name="Extração e monitoramento de dados públicos"
          id="extracao"
        />

        <FilterElement
          name="Gestão – Escritórios e Departamentos Jurídicos"
          id="gestao"
        />

        <FilterElement
          name="IA – Setor Público"
          id="iaSetorPublico"
        />

        <FilterElement
          name="Redes de Profissionais"
          id="redesProfissionais"
        />

        <FilterElement
          name="Resolução de conflitos online"
          id="resolucaoConflito"
        />

        <label htmlFor="remember" className="panel-block">
          <input id="remember" type="checkbox" /> lembrar-me
        </label>
        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth">apagar filtros</button>
        </div>
      </nav>
    </div>);
  }
}
