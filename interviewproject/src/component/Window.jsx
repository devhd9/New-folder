import React, { useState, useEffect } from "react";
import axios from "axios";
export const Window = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4000/authors")
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const checkString = (obj) => {
    return obj.name.toLowerCase().includes(search);
  };
  const filteredData = search.trim() ? data.filter(checkString) : null;
  const set = !search.trim() ? data : filteredData;
  const subset = set.slice(page + 0, page + 3);
  const increment = () => {
    if (page + 3 > data.length) return;
    setPage(page + 3);
  };
  const decrement = () => {
    if (page - 3 < 0) return;
    setPage(page - 3);
  };
  return (
    <div>
      <h1 className='mt-5 text-xl'>Author List</h1>
      <SearchList setPage={setPage} search={search} setSearch={setSearch} />
      <div className='border'>
        <List subset={subset} />
      </div>
      <div>
        <button
          className='px-3 py-2 bg-purple-500 text-white rounded'
          onClick={decrement}>
          Previous
        </button>
        <button
          className='px-3 py-2 bg-fuchsia-500 text-white rounded mx-2'
          onClick={increment}>
          next{" "}
        </button>
      </div>
    </div>
  );
};

const SearchList = (props) => {
  const { search, setSearch, setPage } = props;
  const searchHandler = (value) => {
    setPage(0);
    setSearch(value.toLocaleLowerCase());
  };
  return (
    <div className='flex'>
      <input
        className='ml-auto mr-3 px-3 py-2 mb-2 border border-3'
        value={search}
        onChange={(e) => searchHandler(e.target.value)}
        type='search'
        name=''
        id=''
        placeholder='Search...'
      />
    </div>
  );
};

const List = (props) => {
  const { subset } = props;
  return (
    <>
      {subset.map((obj, i) => {
        return (
          <div className='border-b-1 border-t-1 my-5' key={i}>
            <ListItem obj={obj} />
          </div>
        );
      })}
    </>
  );
};

const ListItem = (props) => {
  const { obj } = props;
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className='flex px-5'>
        <span className='mr-auto'>{obj.name} </span>
        <span
          className='text-white bg-red-600 mx-5 rounded px-3 py-2 ml-auto'
          onClick={clickHandler}>
          {!open ? "open" : "close"}
        </span>
      </div>
      <hr />
      {/* ------------------- */}
      <div
        className='m-8 border border-2'
        style={{ display: open ? "block" : "none" }}>
        <h6 className='text-left '>
          {" "}
          <span>
            {" "}
            <strong>Age:</strong> {obj.age}
          </span>{" "}
        </h6>
        <div className='text-left'>
          {" "}
          <strong>About Author:</strong>{" "}
        </div>
        <p className='mx-5 my-2' style={{ textAlign: "justify" }}>
          {obj.description}
        </p>
        <br />
        <hr />
        <br />
        <BookList bookIds={obj.bookIds} open={open} />
      </div>
    </>
  );
};

const BookList = (props) => {
  const [data, setData] = useState([]);
  const { bookIds, open } = props;
  if (open && !data.length) {
    axios
      .post("http://localhost:4000/books", { bookIds: bookIds })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(data);
  return (
    <div>
      {data.map((obj, i) => {
        return (
          <div className='text-left'>
            <ul>
              <li>
                {" "}
                <strong>BookName:</strong> {obj["_doc"].name}{" "}
              </li>
              <div className='text-left'>
                {" "}
                <strong>Description:</strong>{" "}
              </div>
              <p className='text-justify'>{obj["_doc"].description}</p>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
