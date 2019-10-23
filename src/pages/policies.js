import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from 'components/Layout'
import Content from 'components/Content'
import SEO from 'components/Seo'
import GridTemplate from 'components/GridTemplate'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Política de Privacidade" />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <GridTemplate>
        <Content>
          <h2>Política de privacidade para <strong>felipefialho.com</strong></h2>

          <p>Todas as suas informações pessoais recolhidas, serão usadas para o ajudar a tornar a sua visita nesse site o mais produtiva e agradável possível.</p>

          <p>A garantia da confidencialidade dos dados pessoais dos usuários desse site é importante para o <strong>felipefialho.com</strong>.</p>

          <p>Todas as informações pessoais que usem o <strong>felipefialho.com</strong> serão tratadas em concordância com a Lei Nº 13.709, de 14 de Agosto de 2018.</p>

          <p>A informação pessoal recolhida pode incluir o seu nome, e-mail, número de telefone e/ou telemóvel, morada, data de nascimento e/ou outros.</p>

          <p>O uso do <strong>felipefialho.com</strong> pressupõe a aceitação deste acordo de privacidade. O site <strong>felipefialho.com</strong> reserva-se ao direito de alterar este acordo sem aviso prévio. Deste modo, recomendamos que consulte a nossa política de privacidade com regularidade de forma a estar sempre atualizado.</p>

          <h2>Os anúncios</h2>

          <p>Tal como outros websites, coletamos e utilizamos informação contida nos anúncios. A informação contida nos anúncios, inclui o seu endereço IP (Internet Protocol), o seu ISP (Internet Service Provider), o browser que utilizou ao visitar o nosso website (como o Chrome, Internet Explorer ou o Firefox), o tempo da sua visita e que páginas visitou dentro do nosso website.</p>

          <h2>Cookie DoubleClick Dart</h2>

          <p>O Google, como fornecedor de terceiros, utiliza cookies para exibir anúncios no nosso website;</p>

          <p>Com o cookie DART, o Google pode exibir anúncios com base nas visitas que o leitor fez a outros websites na Internet;</p>

          <p>Os usuários podem desativar o cookie DART visitando a Política de privacidade da rede de conteúdo e dos anúncios do Google.</p>

          <h2>Os Cookies e Web Beacons</h2>

          <p>Utilizamos cookies para armazenar informação, tais como as suas preferências pessoas quando visita o nosso website. Como para por exemplo guardar suas preferências de tema quando retornar ao site.</p>

          <p>O Aplicativo usa o Google Analytics, um serviço de análise prestado pelo Google, Inc. ("Google"). O Google Analytics utiliza cookies para nos ajudar a analisar como os Usuários utilizam o Aplicativo. As informações coletadas no cookie sobre o modo como você utiliza o Aplicativo (inclusive seu endereço IP) serão transmitidas ao Google e armazenadas por ele em servidores nos Estados Unidos. O Google utilizará essas informações com o objetivo de avaliar o modo como você utiliza o Aplicativo, criar relatórios sobre as atividades no Aplicativo e prestar outros serviços relativos às atividades no Aplicativo e ao uso da Internet. O Google também pode transferir essas informações a terceiros quando exigido por lei ou para que tais terceiros processem as informações em nome e por conta do Google. O Google não associará seu endereço IP a qualquer outro dado. A utilização pelo Google desses dados é regida pelos Termos de Uso do Google Analytics e pela <a href="https://policies.google.com/technologies/partner-sites">Política de Privacidade do Google</a>.</p>

          <p>Em adição também utilizamos publicidade de terceiros no nosso website para suportar os custos de manutenção. Alguns destes publicitários, poderão utilizar tecnologias como os cookies e/ou web beacons quando publicitam no nosso website, o que fará com que esses publicitários (como o Google através do Google AdSense) também recebam a sua informação pessoal, como o endereço IP, o seu ISP, o seu browser, etc. Esta função é geralmente utilizada para geotargeting (mostrar publicidade de São Paulo apenas aos leitores oriundos de São Paulo por ex.) ou apresentar publicidade direcionada a um tipo de utilizador (como mostrar publicidade de restaurante a um utilizador que visita sites de culinária regularmente, por ex.).</p>

          <p>Você detém o poder de desligar os seus cookies, nas opções do seu browser. No entanto, isso poderá alterar a forma como interage com o nosso website, ou outros websites. Isso poderá afetar ou não permitir que faça logins em sites pela internet.</p>

          <h2>Conexões para sites de terceiros</h2>

          <p>O <strong>felipefialho.com</strong> possui conexões para outros sites, que podem conter informações úteis. A nossa política de privacidade não é aplicada a sites de terceiros, pelo que, caso visite outro site a partir do nosso deverá ler a politica de privacidade do mesmo.</p>

          <p>Não nos responsabilizamos pela política de privacidade ou conteúdo presente nesses mesmos sites.</p>
        </Content>
      </GridTemplate>
    </Layout>
  )
}

export default IndexPage
