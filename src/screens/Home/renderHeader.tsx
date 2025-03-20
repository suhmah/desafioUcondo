import React from 'react';
import { Margin } from '../../components/Margin';
import { Row } from '../../components/Row';
import Text from '../../components/Text';




const RenderComponentHeader = ({ total }: { total: number }) => {
  return (
    <>
      <Margin mh={24}></Margin>
      <Row justify="space-between">
        <Text variant='subTitle'>Listagem</Text>
        <Text variant='label'>{total} {total > 1 ? "registros" : "registro"}</Text>
      </Row>
      <Margin mh={18} />
    </>
  );
}

export default RenderComponentHeader;