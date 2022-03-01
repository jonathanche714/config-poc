import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Overlay } from './components/Overlay';
import { Table } from './components/Table';
import {
  transformConfigDataToTableData,
  transformTableDataToConfigData,
} from './utils';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

export function ConfigurationPage() {
  const columns = useMemo(
    () => [
      {
        Header: 'Key',
        accessor: 'key',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    []
  );

  const [configData, setConfigData] = useState(null);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [isOverlayDisplayed, setIsOverlayDisplayed] = useState(false);

  const data = useMemo(
    () => transformConfigDataToTableData(configData),
    [configData]
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('/api/test');
      const response = await data.json();
      setConfigData(response);
    };

    getData();
  }, []);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const updateMyData = (value, original) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setConfigData((old) => {
      // make a copy of the object
      const copy = Object.assign({}, old);
      // set the new value on the key
      copy.configs[original.key] = value;
      return copy;
    });
  };

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  const onSubmit = () => {
    fetch('/api/test', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformTableDataToConfigData(data)),
    });
  };

  const onAddClick = () => setIsOverlayDisplayed(true);

  return isOverlayDisplayed ? (
    <Overlay setIsOverlayDisplayed={setIsOverlayDisplayed} data={data} />
  ) : (
    <Styles>
      <button onClick={onSubmit}>submit</button>
      <button onClick={onAddClick}>add</button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <ReactJson src={data} />
    </Styles>
  );
}

export default ConfigurationPage;
