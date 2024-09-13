import { useEffect, useState } from "react";
import "react-virtualized/styles.css";

type JsonData = {
  am: string;
  c: string;
  d: string;
  no: string;
};

function App() {
  const [message, setMessage] = useState("");

  const [data, setData] = useState<JsonData[]>([]);
  const [result, setResult] = useState<JsonData[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResult = result.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (data.length > 0) return;
    const promises = [];
    for (let i = 1; i <= 11; i++) {
      promises.push(
        fetch(`./data/data-${i}.json`).then((response) => response.json())
      );
    }
    Promise.all(promises)
      .then((data) => {
        const flattenedData = data.flatMap((item) => item);
        console.log({ count: flattenedData.length });
        setData(flattenedData);
        setResult(flattenedData);
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
  }, [data.length]);

  function onSearch() {
    const resultTemp: JsonData[] = [];
    setCurrentPage(1);

    data.forEach((item) => {
      if (item.c.toLowerCase().includes(message.toLowerCase())) {
        resultTemp.push(item);
      }
    });

    setResult(resultTemp);
  }

  return (
    <>
      <div className="p-4 h-fit">
        <div className="m-4">
          <label className="input input-bordered input-info flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Nhập nội dung cần tìm kiếm"
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
            />
            <button onClick={onSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </div>
        <div className="m-4 rounded-box mb-10">
          <table className="table table-lg">
            <thead>
              <tr className="sticky top-5 bg-white text-black transition-all">
                <th>STT</th>
                <th>No</th>
                <th>Ngày</th>
                <th>Số tiền (VND)</th>
                <th>Nội dung</th>
              </tr>
            </thead>
            <tbody>
              {currentResult.length > 0 ? (
                currentResult.map((item, index) => (
                  <tr key={index} className="hover">
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.no}</td>
                    <td className="whitespace-nowrap">{item.d}</td>
                    <td>{item.am}</td>
                    <td>{item.c}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="whitespace-nowrap">
                    Không tìm thấy kết quả nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {currentResult.length > 0 && (
          <div className="join fixed bottom-4 right-8 z-10">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              Đầu
            </button>

            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(result.length / itemsPerPage)}
            >
              »
            </button>
            <button
              className="join-item btn"
              disabled={currentPage === Math.ceil(result.length / itemsPerPage)}
              onClick={() =>
                handlePageChange(Math.ceil(result.length / itemsPerPage))
              }
            >
              Cuối
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
