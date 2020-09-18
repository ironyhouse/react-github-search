import React, { useContext, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Repos } from '../components/repos'
import { GithubContext } from '../context/github/githubContext'

export const Profile = ({match}) => {
    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
    const urlName = match.params.name

    useEffect(() => {
        getUser(urlName)
        getRepos(urlName)
        // eslint-disable-next-line 
    }, [])

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    const {
        name, company, avatar_url,
        location, bio, blog,
        login, html_url, followers,
        following, public_repos, public_gists
    } = user

    return (
        <Fragment>
            <Link to="/" className="btn btn-outline-primary mb-3">Home Page</Link>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <img 
                                style={{width: '150px'}}
                                src={avatar_url} 
                                alt={name} 
                            />
                            <h3>{name}</h3>
                            {location && <p>Местоположение: {location}</p>}
                            </div>
                            <div className="col p-2">
                                {
                                    bio && <Fragment>
                                                <h3>BIO</h3>
                                                <p>{bio}</p>
                                            </Fragment>
                                }
                            <div className="d-flex justify-content-center justify-content-sm-start">
                                <a 
                                    href={html_url} 
                                    rel="noopener noreferrer"
                                    target="_blank" 
                                    className="btn btn-dark"
                                    >Open Profile
                                </a>
                            </div>
                            <ul className="pt-3">
                                {login && <li>
                                            <b>User: </b> {login}
                                        </li>}
                                {company && <li>
                                            <b>Company: </b> {company}
                                        </li>}
                                {blog && <li>
                                            <b>Website: </b> {blog}
                                        </li>}
                            </ul>

                            <div className="badge badge-primary m-1 p-2">Followers: {followers}</div>
                            <div className="badge badge-info m-1 p-2">Following: {following}</div>
                            <div className="badge badge-secondary m-1 p-2">Repositories: {public_repos}</div>
                            <div className="badge badge-dark m-1 p-2">Gists: {public_gists}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Repos repos={repos}/>
        </Fragment>
    )
}