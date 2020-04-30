import React from 'react';
import Skeleton from "@material-ui/lab/Skeleton";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
const SkeletonLoading = ({columns, statesShowColumn, rowsCount}) => {

  return (
    <TableBody>
      {
        [1,2,3,4,5,6,7,8,9,10].map((row, index) => {
          return (
            <TableRow
              key={`tableRow_${index}`}
            >
              {statesShowColumn['checkbox_'] && <TableCell>
                <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="40%" />
              </TableCell>}
              {
                Object.entries(columns).map(([nameKey, values], index) => {

                    return(
                      <React.Fragment key={`cell_${index}_${nameKey}`}>
                        {statesShowColumn[nameKey] && <TableCell align="left">
                          <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                          <Skeleton animation="wave" height={10} width="40%" />
                        </TableCell>}
                      </React.Fragment>
                    )
                  }
                )
              }
              <TableCell align="right">
                <Skeleton variant="circle" width={40} height={40} />
              </TableCell>


            </TableRow>
          )
        })
      }

    </TableBody>
  );

  return (
    <>

    </>
  );
};

export default SkeletonLoading;
