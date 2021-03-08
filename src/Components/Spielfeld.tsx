import Coin from "./Coin";
import Empty from "./Empty";
import Wall from "./Wall";
import Hackman from "./Hackman";

interface ISpielfeldProps {
  fields: React.FC[][];
}

const renderComponent = (component: React.FC, key: number) => {
  if (component === Wall) return <Wall key={key} />;
  else if (component === Coin) return <Coin key={key} />;
  else if (component === Hackman) return <Hackman key={key} />;
  else if (component === Empty) return <Empty key={key} />;

  return undefined;
};

const Spielfeld: React.FC<ISpielfeldProps> = (props) => {
  return (
    <div className="App center">
      {props.fields.map((row, x) => {
        return (
          <div className="row" key={x}>
            {row.map((field, y) => {
              return renderComponent(field, y);
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Spielfeld;
