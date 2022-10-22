import { format } from 'date-fns';
export function dataHeaderAdvertisement() {
    const headers = [
        {
            title: 'ID',
            field: 'id',
            styleHeader: {
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            styleBody: {
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            renderBody: (value) => (<div>
          <span>{value.id}</span>
        </div>),
        },
        {
            title: 'Name',
            field: 'name',
            styleHeader: {
                width: 300,
                minWidth: 300,
                maxWidth: 300,
            },
            styleBody: {
                width: 300,
                maxWidth: 300,
                minWidth: 300,
            },
            renderBody: (value) => (<div>
          <span>{value.name}</span>
        </div>),
        },
        {
            title: 'Video',
            field: 'video',
            styleHeader: {
                width: 400,
                minWidth: 400,
                maxWidth: 400,
            },
            styleBody: {
                width: 400,
                minWidth: 400,
                maxWidth: 400,
                paddingLeft: 30,
                padding: '10px 0',
            },
            renderBody: (value) => (<video width='320px' height='320px' controls>
          <source src={value.link} type='video/mp4'/>
        </video>),
        },
        {
            title: 'Date',
            field: 'date',
            styleSort: {
                justifyContent: 'flex-end',
            },
            styleHeader: {
                width: '100vh',
                minWidth: 250,
                maxWidth: '100vw',
            },
            styleBody: {
                width: '100vh',
                minWidth: 250,
                maxWidth: '100vw',
                marginLeft: 'auto',
            },
            renderBody: (value) => {
                const date = new Date(value.createdAt);
                const formattedDate = format(date, 'dd MMMM yyyy');
                return (<div className='flex items-center justify-end'>
            <span>{formattedDate}</span>
          </div>);
            },
        },
    ];
    return headers;
}
