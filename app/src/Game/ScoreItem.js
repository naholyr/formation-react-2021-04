import { number } from "prop-types";
import { bool } from "prop-types";
import { string } from "prop-types";
import { memo, PureComponent } from "react";

export const ScoreItem = memo(function ({ name, score, isMyself = false }) {
  return (
    <li className={isMyself ? "myself" : ""}>
      <strong className="player">{name}</strong>
      <em className="score">{score} pts</em>
    </li>
  );
});

class ScoreItemCls extends PureComponent {
  static propTypes = {
    name: string.isRequired,
    score: number.isRequired,
    isMyself: bool,
  };

  static defaultProps = {
    isMyself: false,
  };

  render() {
    const { name, score, isMyself } = this.props;

    return (
      <li className={isMyself ? "myself" : ""}>
        <strong className="player">{name}</strong>
        <em className="score">{score} pts</em>
      </li>
    );
  }
}
