import { LiaCoinsSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { formatDate, formatNumber } from '../../utils/format';
import useAuthStore from '../../stores/useAuthStore';
import { BiCoin } from 'react-icons/bi';
import NoData from '../Atoms/NoData';

const PointHistory = ({ points }) => {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <div className="mt-8 p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between">
        <h2 className="flex items-center gap-2 font-bold text-xl">
          <LiaCoinsSolid size={20} /> 포인트 내역
        </h2>

        <Link
          to="/pointhistory"
          className="text-primary font-bold">
          더 보기
        </Link>
      </div>

      {points?.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md mb-10">
          {isAuthenticated &&
            points?.slice(0, 3).map((point, index) => (
              <li
                key={index}
                className="list-row flex-col flex">
                <div className="py-2 border-b border-stone-200 flex justify-between items-center">
                  <div>{formatDate(point.received_date)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-6">
                    <div className="flex flex-col">
                      <h2 className="text-md font-bold">{point.title}</h2>
                      <div className="my-4 text-xs uppercase opacity-60">
                        {point.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-secondary">
                    {point.type === 'used' ? '-' : '+'}
                    {formatNumber(point.points)} 포인트
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <NoData
          text={'포인트 내역이 없습니다.'}
          icon={BiCoin}
        />
      )}
    </>
  );
};

export default PointHistory;
