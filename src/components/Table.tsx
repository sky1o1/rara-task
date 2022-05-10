import { useState, useEffect, useCallback } from "react";
import { Checkbox, Input, Text } from "@chakra-ui/react";
import Buttons from "./Buttons";
import { debounce } from "ts-debounce";
import { AddIcon } from "@chakra-ui/icons";
import { IData } from "../lib/interface/IData";
import { useRouter } from "next/router";

type DataProps = {
  data: IData[];
};

const Table = ({ data }: DataProps) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [newData, setNewData] = useState<IData[]>([]);

  const changeState = () => {
    setChecked(!checked);
  };

  const handleInput = (e: any) => {
    handleFilter(e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(handleInput, 300), []);

  useEffect(() => {
    if (data) {
      setNewData(data.users.data);
    }
  }, [data]);

  const handleFilter = (inp: string) => {
    if (data != undefined) {
      const filteredData = data?.users?.data?.filter((x) => {
        if (Object.values(x).includes(inp)) {
          return true;
        }
      });
      if (inp) {
        setNewData(filteredData);
      } else {
        setNewData(data?.users?.data);
      }
    }
  };

  return (
    <section>
      <div className="container">
        <div className="col">
          <Text fontSize="xl">Users</Text>
        </div>
        <div className="rowContainer">
          <Input
            style={{ marginRight: 20 }}
            onChange={debouncedChangeHandler}
            placeholder="Search..."
          />
          <Buttons
            onClick={() => router.push("/addUser")}
            title="Add User"
            icon={<AddIcon />}
          />
        </div>
      </div>
      <header>
        <div className="col">
          <Checkbox
            isChecked={checked}
            onChange={changeState}
            style={{ padding: 15 }}
          />
        </div>
        <div className="col">Name</div>
        <div className="col">Username</div>
        <div className="col">Phone</div>
        <div className="col">Website</div>
        <div className="col">Address</div>
        <div className="col">Email</div>
      </header>
      {newData?.length > 0 ? (
        newData.map((x) => {
          return (
            <div key={x?.id} className="row">
              <div className="col">
                <Checkbox isChecked={checked} style={{ padding: 15 }} />
              </div>
              <div className="col">{x?.name}</div>
              <div className="col">{x?.username}</div>
              <div className="col">{x?.phone}</div>
              <div className="col">{x?.website}</div>
              <div className="col">{x?.address?.street}</div>
              <div className="col">{x?.email}</div>
            </div>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
          }}>
          No data found
        </div>
      )}
    </section>
  );
};

export default Table;
