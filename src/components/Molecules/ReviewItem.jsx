import Rating from '../Atoms/Rating';
import { formatDate } from '../../utils/format';
import { BiMessageAltEdit, BiSolidUser } from 'react-icons/bi';
import NoData from '../Atoms/NoData';

const ReviewItem = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-4">
        <NoData
          text="리뷰가 없습니다."
          icon={BiMessageAltEdit}
        />
      </div>
    );
  }

  return (
    <>
      {reviews?.map((review, index) => (
        <li
          key={index}
          className="list-row">
          {/* 프로필 */}
          <div className="w-[50px] h-[50px] rounded-lg overflow-hidden">
            {review.userInfo.profile_image ? (
              <img
                className="w-[100%] h-[100%] object-cover"
                src={review.userInfo.profile_image}
                alt={review.userInfo.nickname}
              />
            ) : (
              <div className="flex justify-center items-center w-[100%] h-[100%] bg-gray-100 dark:bg-base-200">
                <BiSolidUser
                  size={24}
                  className="text-gray-300"
                />
              </div>
            )}
          </div>

          {/* 유저 정보 */}
          <div>
            <div>{review.userInfo.nickname}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {formatDate(review.created_at)}
            </div>
          </div>

          {/* 리뷰 내용 */}
          <p className="list-col-wrap text-xs">{review.comment}</p>

          {/* 별점 */}
          <Rating
            rating={review.rating}
            readOnly={true}
          />
        </li>
      ))}
    </>
  );
};

export default ReviewItem;
