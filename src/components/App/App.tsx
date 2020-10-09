import React from 'react';

import * as S from './App.sc';
import { useData } from './hooks/useData';

function App() {
    const { data, getDataOnce, isRequest } = useData();

    return (
        <S.Wrapper>
            <S.Button onClick={getDataOnce}>Fetch data</S.Button>

            <S.Data>
                {isRequest ? <S.Spinner /> : data.map((item) => <S.Item key={item.name}>{item.name}</S.Item>)}
            </S.Data>
        </S.Wrapper>
    );
}

export default App;
