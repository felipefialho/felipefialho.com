import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class HTML extends Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                window.__onThemeChange = function() {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  usedTheme = newTheme;
                  document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }
                var usedTheme;
                try {
                  usedTheme = localStorage.getItem('theme');
                } catch (err) { }
                window.__setTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }
                const userHasDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (userHasDarkMode) {
                  setTheme(usedTheme || 'theme-dark');
                } else {
                  setTheme(usedTheme || 'theme-light');
                }
              })();
            `
            }}
          />

          {this.props.preBodyComponents}

          <noscript>
            Sem JavaScript isso aqui não funciona :/
          </noscript>
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
