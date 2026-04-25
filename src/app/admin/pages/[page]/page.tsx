import PageEditorClient from '@/components/admin/PageEditorClient'

export default async function AdminPageEditor({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  return <PageEditorClient pageKey={page} />
}
