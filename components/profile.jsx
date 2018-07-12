import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

import ProfileTabs from './profile/profile-tabs';
import ProfileTag from './profile/profile-tag';
import ProfileLogo from './profile/profile-logo';
import ProfileImage from './profile/profile-image';

import ProfileHistory from './profile/profile-history';
// import ProfilePartners from './profile/profile-partners';
import ProfileProducts from './profile/profile-products';
import ProfileCompany from './profile/profile-company';
import ProfileContact from './profile/profile-contact';
import Notification from './notification';

export default class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile,
      tab: 'company',
    };
  }

  render() {
    const { profile } = this.state;
    return (<div className="hero container">
      <div className="columns">
        <div className="column">
          <div className="hero-body">

            <div className="field is-grouped is-grouped-multiline">
              <ProfileTag
                id="group"
                options={[
                  'Lawtech/Legaltech',
                  'Escritórios de Advocacia',
                  'Departamento Jurídico',
                  'Prestadores de Serviço',
              ]}
                value={profile.userContext_group || 'Nenhum Grupo'}
                profile={profile}
              />
              <ProfileTag
                id="business"
                options={[
                  'Analytics e Jurimetria',
                  'Automação e Gestão de Documentos',
                  'Conteúdo Jurídico, Educação e Consultoria',
                  'Extração e monitoramento de dados públicos',
                  'Gestão – Escritórios e Departamentos Jurídicos',
                  'IA – Setor Público',
                  'Redes de Profissionais',
                  'Resolução de conflitos online',
                  'Compliance',
                  'Tax',
                ]}
                value={profile.userContext_business || 'Nenhuma Categoria'}
                profile={profile}
              />
            </div>

            <div className="columns">
              <div className="column is-one-fifth">
                <ProfileLogo profile={profile} />
              </div>
              <div className="column">
                <h2 className="title">{profile.bipbopContentRFB.nome}</h2>
                <h3 className="subtitle">{profile.bipbopContentRFB['natureza-juridica']}</h3>
              </div>
            </div>

            <div className="field is-grouped is-grouped-multiline">
              <ProfileTag
                type="success"
                value={`Fundada ${moment(profile.birthdayCompany).fromNow()}`}
              />
            </div>


            { profile.token && !profile.approved && <Notification
              type="danger"
              message="Seu perfil ainda não foi ainda aprovado e por tanto não é visível no radar AB2L."
            /> }

            { profile.token && !profile.emailChecked && <Notification
              type="danger"
              message="Você ainda não verificou sua caixa de e-mails para receber notificações e ter seu perfil aprovado."
            /> }

            <ProfileTabs
              tabs={{
                    company: 'Empresa',
                    history: 'História',
                    products: 'Produtos',
                    contact: 'Contato',
                  }}
              active={this.state.tab}
              onChange={e => this.setState({ tab: e })}
            />

            { this.state.tab === 'company' && <ProfileCompany profile={profile} /> }
            { this.state.tab === 'history' && <ProfileHistory profile={profile} /> }
            { this.state.tab === 'products' && <ProfileProducts profile={profile} /> }
            { this.state.tab === 'contact' && <ProfileContact profile={profile} /> }

          </div>
        </div>

        <div className="column">
          <ProfileImage profile={profile} />
        </div>
      </div>
    </div>);
  }
}
