import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function TableSkeleton() {
  return (
    <table className="w-full divide-y-[1px] divide-gray500/10">
      <thead>
        <tr className="grid grid-cols-7 place-items-start py-4">
          <th className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={100}
              height={20}
              borderRadius={4}
            />
          </th>
          <th className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={100}
              height={20}
              borderRadius={4}
            />
          </th>
          <th className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={100}
              height={20}
              borderRadius={4}
            />
          </th>
          <th className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={100}
              height={20}
              borderRadius={4}
            />
          </th>
          <th className="col-span-3"></th>
        </tr>
      </thead>
      <tbody className="divide-y-[1px] divide-gray500/10">
        <tr className="grid grid-cols-7 py-4">
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-3 grid place-content-end place-items-end content-center" />
        </tr>
        <tr className="grid grid-cols-7 py-4">
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-3 grid place-content-end place-items-end content-center" />
        </tr>
        <tr className="grid grid-cols-7 py-4">
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-1">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={125}
              height={20}
              borderRadius={4}
            />
          </td>
          <td className="col-span-3 grid place-content-end place-items-end content-center" />
        </tr>
      </tbody>
    </table>
  )
}
