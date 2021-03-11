import { PaginationItem } from '@material-ui/lab';
import React from 'react'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const Pagination = ({postsPerPage,totalPosts,paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++)
    {
        pageNumbers.push(i)
    }
    return (
        <div>
            
            {pageNumbers.map((number,key) => 
            {
               return <Link className="PaginationCircle" key={key} onClick={() => paginate(number)}>
                                {number}
                      </Link>
                        
            })}
        </div>
    )
}

export default Pagination;
