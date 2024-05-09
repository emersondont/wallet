import { CaretLeft, CaretRight } from 'phosphor-react'
import { useState } from 'react';
interface Props {
  month: string;
  setMonth: (month: string) => void;
  year: string;
  setYear: (year: string) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
}

export const months = [
  {
    index: '01',
    label: 'Jan'
  },
  {
    index: '02',
    label: 'Fev'
  },
  {
    index: '03',
    label: 'Mar'
  },
  {
    index: '04',
    label: 'Abr'
  },
  {
    index: '05',
    label: 'Mai'
  },
  {
    index: '06',
    label: 'Jun'
  },
  {
    index: '07',
    label: 'Jul'
  },
  {
    index: '08',
    label: 'Ago'
  },
  {
    index: '09',
    label: 'Set'
  },
  {
    index: '10',
    label: 'Out'
  },
  {
    index: '11',
    label: 'Nov'
  },
  {
    index: '12',
    label: 'Dez'
  }
]

export default function MonthPicker(props: Props) {
  const [newYear, setNewYear] = useState(props.year);

  const handleClickMonth = (month: string) => {
    props.setMonth(month);
    props.setYear(newYear);
    props.setModalIsOpen(false)
  }

  return props.modalIsOpen ? (
    <div className="bg-background bg-opacity-95 absolute right-0 top-14 rounded-xl p-3 gap-3 flex flex-col">
      {/* year */}
      <div className='flex w-full justify-between items-center'>
        <button
          className='p-1 hover:bg-textSecondary hover:bg-opacity-50 rounded duration-200 ease-out'
          onClick={() => setNewYear((parseInt(newYear) - 1).toString())}
        >
          <CaretLeft size={24} />
        </button>
        <h2 className='text-2xl font-bold'>{newYear}</h2>
        <button
          className='p-1 hover:bg-textSecondary hover:bg-opacity-50 rounded duration-200 ease-out'
          onClick={() => setNewYear((parseInt(newYear) + 1).toString())}
        >
          <CaretRight size={24} />
        </button>
      </div>

      {/* month */}
      <div className='grid grid-cols-4'>
        {months.map((month) => (
          <button
            key={month.index}
            onClick={() => handleClickMonth(month.index)}
            className={'text-lg p-2 hover:bg-textSecondary hover:bg-opacity-50 hover:border-textSecondary border-opacity-50 rounded duration-200 ease-out border ' +
              (props.month === month.index && props.year === newYear ?
                'border-textSecondary bg-textSecondary bg-opacity-50' :
                'border-transparent'
              )
            }
          >
            {month.label}
          </button>
        ))}
      </div>

    </div>
  ) :
    null

}