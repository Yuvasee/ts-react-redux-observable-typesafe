import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Button = styled(MuiButton).attrs({ variant: 'contained' })`
    font-weight: bold;
`;

export const Data = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
`;

export const Item = styled.p`
    margin-top: 10px;
`;

export const Spinner = styled(MuiCircularProgress)``;
