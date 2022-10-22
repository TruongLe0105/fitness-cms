/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import useRewardHooks from "../hooks/useRewardHooks";
import CostCard from "./CostCard";

const RewardCard = (): JSX.Element => {
  const { reward, isLoading, updateReward } = useRewardHooks();

  return (
    <>
      <CostCard
        classes="reward-card"
        label={`Reward*`}
        onSubmit={updateReward}
        defaultValue={reward.value}
        style={{ width: 400 }}
      />
      {isLoading ? <BackdropCustomize /> : null}
    </>
  );
};

export default RewardCard;
