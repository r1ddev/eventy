import React from 'react';
import "./no-permissions.css"
class NoPermissions extends React.Component {

    render() {
        return (
            <div className="min-vh-100 flex-center">
                <div class="alert alert-info" role="alert">
                    <div className='alert-link'>У вас нет прав для просмотра этой страницы :(</div>
                </div>
            </div>
        )
    }
}



export default NoPermissions;
