import React from 'react';

const CoreuiMenu = props => {
  return (
      <body classNameName="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
          <div id="root">
              <div data-reactroot="" classNameName="app">
                  <header classNameName="app-header navbar"><button classNameName="navbar-toggler mobile-sidebar-toggler hidden-lg-up" type="button">☰</button><a classNameName="navbar-brand"
                      href="#"></a>
                      <ul classNameName="nav navbar-nav hidden-md-down">
                          <li classNameName="nav-item"><a classNameName="nav-link navbar-toggler sidebar-toggler" href="#">☰</a></li>
                          <li className="nav-item px-1"><a className="nav-link" href="#">Dashboard</a></li>
                          <li className="nav-item px-1"><a className="nav-link" href="#">Users</a></li>
                          <li className="nav-item px-1"><a className="nav-link" href="#">Settings</a></li>
                      </ul>
                      <ul className="nav navbar-nav ml-auto">
                          <li className="nav-item hidden-md-down"><a className="nav-link" href="#"><i className="icon-bell"></i><span className="badge badge-pill badge-danger">5</span></a></li>
                          <li
                              className="nav-item hidden-md-down"><a className="nav-link" href="#"><i className="icon-list"></i></a></li>
                          <li className="nav-item hidden-md-down"><a className="nav-link" href="#"><i className="icon-location-pin"></i></a></li>
                          <li className="nav-item">
                              <div className="dropdown"><a className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                                  aria-expanded="false"><img src="img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/><span className="hidden-md-down">admin</span></a>
                                  <div tabindex="-1" aria-hidden="true" role="menu" className="dropdown-menu-right dropdown-menu">
                                      <h6 tabindex="-1" className="text-center dropdown-header"><strong>Account</strong></h6><button tabindex="0" className="dropdown-item"><i className="fa fa-bell-o"></i><span className="badge badge-info">42</span></button>
                                      <button
                                          tabindex="0" className="dropdown-item"><i className="fa fa-envelope-o"></i>
                                          <span className="badge badge-success">42</span></button><button tabindex="0" className="dropdown-item"><i className="fa fa-tasks"></i><span className="badge badge-danger">42</span></button>
                                      <button
                                          tabindex="0" className="dropdown-item"><i className="fa fa-comments"></i>
                                          <span className="badge badge-warning">42</span></button>
                                      <h6 tabindex="-1" className="text-center dropdown-header"><strong>Settings</strong></h6><button tabindex="0" className="dropdown-item"><i className="fa fa-user"></i></button>
                                      <button
                                          tabindex="0" className="dropdown-item"><i className="fa fa-wrench"></i>
                                      </button><button tabindex="0" className="dropdown-item"><i className="fa fa-usd"></i><span className="badge badge-default">42</span></button>
                                      <button tabindex="0" className="dropdown-item"><i className="fa fa-file"></i>
                                          <span className="badge badge-primary">42</span></button>
                                      <div tabindex="-1"    className="dropdown-divider"></div>
                                      <button tabindex="0" className="dropdown-item"><i className="fa fa-shield"></i></button>
                                      <button tabindex="0" className="dropdown-item"><i className="fa fa-lock"></i>
                                      </button>
                                  </div>
                            </div>
                        </li>
                        <li className="nav-item hidden-md-down"><a className="nav-link navbar-toggler aside-menu-toggler" href="#">☰</a></li>
                     </ul>
                </header>
            </div>
              </div>
    </body>
  );
}

export default CoreuiMenu;